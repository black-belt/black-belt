import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideoPromotion({
  answerRandom,
  answerMapRandom,
  answerEssential,
  answerMapEssential,
  testResult,
  // updatePartIndex,
  isPass,
  startTimer,
  // isTimer,
  readyAction,
  totalSeconds,
  curNum,
}) {
  const videoRef = useRef(null);
  let net;
  let webcam;
  let isStart = false;
  let testSum = 0.0;
  let nextAction = 1;
  let curAction = 0;
  let curPart = 0;
  // let partIndex = 0;
  // let isFindMax = false;
  let isLastAction = false;
  let maxProbability = 0.0;
  let answer;
  let answerMap;
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

  //이미지 하나 분석용 함수 만들어서
  //interval로 1000/20 = 50ms당 한번씩 하도록 만드는거임
  //그래서 45초면 반복문을 20*45번돌게하는거

  //얘가 끝나면??

  //바로 시작해.. 테스트result보내고 curNum ++을 stage에서 해주면 얘 리렌더링시키도록
  //

  const isReady = async () => {
    const img = await webcam.capture();
    const result = await net.classify(img);
    const className = result[0].className.split(",")[0];
    const probability = result[0].probability;
    img.dispose();
    console.log(curPart, curAction, answer[curPart], result[0].className, result[0].probability);
    console.log(className, readyAction, probability);
    // await tf.nextFrame();
    if (className === readyAction && probability >= 0.6) {
      isStart = true;
      startTimer();
      // console.log("시작~!");
      return true;
    }
    return false;
  };

  const analyzeImage = async () => {
    const img = await webcam.capture();
    const result = await net.classify(img);
    const className = result[0].className.split(",")[0];
    const probability = result[0].probability;
    console.log(curPart, curAction, answer[curPart], result[0].className, result[0].probability);
    img.dispose();

    if (isLastAction) {
      if (answer[curAction] === className && probability > maxProbability) {
        maxProbability = probability;
        // console.log("!!", curNum, curAction, className, maxProbability);
      }
    } else if (answer[curAction] === className && probability > maxProbability) {
      maxProbability = probability;
      // console.log("!!", curNum, curAction, className, maxProbability);
    } else if (answer[nextAction] === className) {
      testSum += maxProbability;
      maxProbability = probability;
      curAction = nextAction++;
      // console.log("!!", curNum, curAction, className, maxProbability);
    } else if (probability >= 0.8 && answerMap.has(className)) {
      const idxArr = answerMap.get(className);
      idxArr.forEach((value) => {
        if (value > curAction) {
          testSum += maxProbability;
          maxProbability = probability;
          curAction = answerMap.get(className);
          nextAction = curAction + 1;
          return false;
        }
      });
      // console.log("!!", curNum, curAction, className, maxProbability);
    }

    if (nextAction === answer.length) {
      isLastAction = true;
    }
  };

  const run = async () => {
    if (curNum === 0) {
      answer = answerRandom;
      answerMap = answerMapRandom;
    } else {
      answer = answerEssential;
      answerMap = answerMapEssential;
    }
    // if (curNum === 0) {
    net = await mobilenet.load();
    webcam = await tf.data.webcam(webCamElement, {
      resizeWidth: 220,
      resizeHeight: 227,
    });
    // }
    let cnt = 0;
    // await isReady();

    while (!isStart) {
      await isReady();
    }
    maxProbability = 0.0;
    testSum = 0.0;
    const loop = setInterval(() => {
      console.log(cnt++);
      analyzeImage();
      if (cnt === (totalSeconds + 2) * 20) {
        testSum += maxProbability;
        maxProbability = 0;
        testResult(testSum);
        testSum = 0;
        clearInterval(loop);
      }
    }, 50);
  };

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    // console.log("!!run", curNum, isPass, answerRandom, totalSeconds, answerMapRandom);
    if (!isPass && answerRandom.length > 0 && totalSeconds > 0 && answerMapRandom.size > 0) {
      // console.log("!!run실행~~");
      run();
    }
  }, [answerRandom, isPass, totalSeconds, curNum]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoPromotion;

const VideoContainer = styled.video`
  height: 28vw;
  // margin-bottom: 60px;
  border-radius: 10px;
`;
