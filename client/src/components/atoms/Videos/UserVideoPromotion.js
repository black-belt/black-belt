import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideoPromotion({ answer, testResult, updateNextAction, updatePartIndex, isPass }) {
  const videoRef = useRef(null);
  let net;
  let testSum = 0.0;
  let nextAction = 1;
  let curAction = 0;
  let nextPart = 0;
  let curPart = 0;
  // let partIndex = 0;
  // let isFindMax = false;
  let isLastAction = false;
  let maxProbability = 0.0;
  let frameCnt = 0;
  // let frameGoal = 5;
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
      console.log(curPart, curAction, answer[curPart], result[0].className, result[0].probability);
      img.dispose();
      if (isLastAction) {
        //마지막 파트, 마지막 동작
        frameCnt++;
        if (answer[curPart][curAction] === className) {
          maxProbability = probability;
        }

        if (frameCnt > 40) {
          // console.log("!!저장", curPart, curAction, nextPart, nextAction, maxProbability);
          testSum += maxProbability;
          frameCnt = 0;
          testResult(curPart, testSum);
          testSum = 0;
          nextAction = 1;
          curAction = 0;
          curPart = 0;
          maxProbability = 0;
          break;
        }
      } else if (answer[curPart][curAction] === className && probability > maxProbability) {
        //하던동작, 더 높은 일치율
        maxProbability = probability;
        updateNextAction(nextAction);
        updatePartIndex(nextPart);
      } else if (answer[nextPart][nextAction] === className) {
        //다음동작 발견됨 -> 다음동작으로 넘어감
        // console.log("!!저장", curPart, curAction, nextPart, nextAction, maxProbability);
        testSum += maxProbability;
        maxProbability = probability;
        curAction = nextAction++;
        if (curPart !== nextPart) {
          testResult(curPart, testSum);
          testSum = 0;
          curPart = nextPart;
        }
        if (nextAction === answer[curPart].length) {
          //마지막 동작이었음
          if (nextPart === 3) {
            //마지막단락이었음
            isLastAction = true;
          } else {
            //다음단락으로 넘어감
            nextPart++;
            nextAction = 0;
          }
        }
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
    // if (!isPass) run();
  }, [answer, isPass]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoPromotion;

const VideoContainer = styled.video`
  height: 33vw;
  // margin-bottom: 60px;
  border-radius: 10px;
`;
