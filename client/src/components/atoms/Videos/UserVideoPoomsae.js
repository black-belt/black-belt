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
      console.log(
        partIndex,
        nextAction,
        answer[partIndex],
        result[0].className,
        result[0].probability
      );
      img.dispose();
      if (isFindMax) {
        if (++frameCnt > 60) {
          isFindMax = false;
          frameCnt = 0;

          updateNextAction(++nextAction);
          testSum += maxProbability;
          maxProbability = 0.0;
          if (nextAction === answer[partIndex].length) {
            //현단락에서 마지막동작
            nextAction = 0;
            updateNextAction(nextAction);
            if (partIndex === 3) {
              //마지막 단락
              testResult(testSum);
              partIndex = 0;
              testSum = 0;
              // const s = videoRef.current.srcObject;
              // s.getTracks().forEach((track) => {
              //   track.stop();
              // });
              break;
            } else {
              updatePartIndex(++partIndex);
            }
          }
        } else if (
          answer[partIndex][nextAction] === result[0].className.split(",")[0] &&
          result[0].probability > maxProbability
        ) {
          maxProbability = result[0].probability;
        }
      } else if (answer[partIndex][nextAction] === result[0].className.split(",")[0]) {
        isFindMax = true;
        maxProbability = result[0].probability;
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
