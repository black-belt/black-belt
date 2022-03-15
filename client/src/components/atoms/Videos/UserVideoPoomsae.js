import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideoPoomsae({ answer, testResult, updateNextAction, updatePartIndex, isPass }) {
  const videoRef = useRef(null);
  let net;
  let testSum = 0.0;
  let nextAction = 0;
  let partIndex = 0;
  let isFindMax = false;
  let maxProbability = 0.0;
  let frameCnt = 0;
  let frameGoal = 5;
  const [webCamElement, setWebCamElement] = useState();

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      // console.log(err);
      return undefined;
    }
  };

  const run = async () => {
    net = await mobilenet.load();
    const webcam = await tf.data.webcam(webCamElement, {
      resizeWidth: 220,
      resizeHeight: 227,
    });
    while (answer[0].length > 0 && !isPass) {
      const img = await webcam.capture();
      const result = await net.classify(img);
      const className = result[0].className.split(",")[0];
      const probability = result[0].probability;
      console.log(
        partIndex,
        nextAction,
        answer[partIndex],
        result[0].className,
        result[0].probability
      );
      img.dispose();
      if (isFindMax) {
        if (++frameCnt > frameGoal) {
          isFindMax = false;
          frameCnt = 0;
          updateNextAction(++nextAction);
          if (nextAction === answer[partIndex].length) {
            //현단락에서 마지막동작
            nextAction = 0;
            updateNextAction(nextAction);
            testSum += maxProbability;
            // console.log("저장", maxProbability);
            testResult(partIndex, testSum);
            testSum = 0;
            frameGoal = 5;
            if (partIndex === 3) {
              //마지막 단락
              partIndex = 0;
              // const s = videoRef.current.srcObject;
              // s.getTracks().forEach((track) => {
              //   track.stop();
              // });
              break;
            } else {
              updatePartIndex(++partIndex);
            }
          }
        } else if (answer[partIndex][nextAction] === className && probability > maxProbability) {
          maxProbability = probability;
        }
      } else if (answer[partIndex][nextAction] === className) {
        isFindMax = true;
        if (nextAction !== 0) testSum += maxProbability;
        // console.log("저장", maxProbability);
        maxProbability = probability;
        if (nextAction === answer[partIndex].length - 1) {
          frameGoal = 60;
        }
      } else if (nextAction > 0 && answer[partIndex][nextAction - 1] === className) {
        //아직 이전동작 하는중
        // console.log("다시");
        isFindMax = true;
        nextAction--;
        if (maxProbability < probability) maxProbability = probability;
      }
      await tf.nextFrame();
    }
  };

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    if (!isPass) run();
  }, [answer, isPass]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoPoomsae;

const VideoContainer = styled.video`
  height: 22vw;
  margin-bottom: 60px;
  border-radius: 10px;
`;
