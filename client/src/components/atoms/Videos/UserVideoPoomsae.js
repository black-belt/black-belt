import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as tmPose from "@teachablemachine/pose";

function UserVideoPoomsae({
  answer,
  testResult,
  updateNextAction,
  updatePartIndex,
  isPass,
  poomsaeId,
}) {
  const videoRef = useRef(null);
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
  let model1, model2;
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

  const setWebcam = async () => {
    const size = 200;
    const flip = true;
    let webcam = await new tmPose.Webcam(size, size, flip);
    // await changeModel(1);
    setWebCamElement(() => webcam);
  };

  const changeModel = async (modelNum, chapter) => {
    // if (modelNum === 1) {
    model1 = await tmPose.load(
      `/models/combos/${(poomsaeId - 1) * 4 + chapter}/model.json`,
      `/models/combos/${(poomsaeId - 1) * 4 + chapter}/metadata.json`
    );
    // } else {
    //   model2 = await tmPose.load(
    //     `/models/combos/${(poomsaeId - 1) * 4 + chapter}/model.json`,
    //     `/models/combos/${(poomsaeId - 1) * 4 + chapter}/metadata.json`
    //   );
    // }
    // setModel(() => m);
  };

  const analyzeImage1 = async () => {
    webCamElement.update(); // update the webcam frame
    // console.log("!!change", model);
    const { posenetOutput } = await model1.estimatePose(webCamElement.canvas);
    const prediction = await model1.predictTopK(posenetOutput, 1);
    const className = prediction[0].className;
    const probability = prediction[0].probability;
    console.log(className, probability);
    return { className: className, probability: probability };
  };

  const analyzeImage2 = async () => {
    webCamElement.update(); // update the webcam frame
    // console.log("!!change", model);
    const { posenetOutput } = await model2.estimatePose(webCamElement.canvas);
    const prediction = await model2.predictTopK(posenetOutput, 1);
    const className = prediction[0].className;
    const probability = prediction[0].probability;
    console.log(className, probability);
    return { className: className, probability: probability };
  };

  const run = async () => {
    await webCamElement.setup();
    await webCamElement.play();
    // await changeModel(1, 1);
    // await changeModel(2, 2);
    let imageResult1, imageResult2;
    while (answer[0].length > 0 && !isPass) {
      console.log(
        "!!",
        curPart,
        curAction,
        nextPart,
        nextAction,
        answer[nextPart][nextAction],
        "len",
        answer[curPart].length
      );
      imageResult1 = await analyzeImage1();
      // imageResult2 = await analyzeImage2();
      if (curAction === 0) {
        await changeModel(1, nextPart + 1);
        maxProbability = 0;
      }
      if (isLastAction) {
        //마지막 파트, 마지막 동작
        frameCnt++;
        if (answer[curPart][curAction] === imageResult1.className) {
          maxProbability = imageResult1.probability;
        }
        if (frameCnt > 10) {
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
      } else if (
        answer[curPart][curAction] === imageResult1.className &&
        imageResult1.probability > maxProbability
      ) {
        //하던동작, 더 높은 일치율
        maxProbability = imageResult1.probability;
        updateNextAction(nextAction);
        updatePartIndex(nextPart);
      } else if (answer[nextPart][nextAction] === imageResult1.className) {
        //다음동작 발견됨 -> 다음동작으로 넘어감
        // console.log("!!저장", curPart, curAction, nextPart, nextAction, maxProbability);
        testSum += maxProbability;
        maxProbability = imageResult1.probability;
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
            updateNextAction(nextAction);
            updatePartIndex(nextPart);
          }
        }
      }
    }
  };

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      // setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    if (webCamElement !== undefined) {
      run();
    }
  }, [webCamElement]);

  useEffect(() => {
    if (!isPass) setWebcam();
  }, [answer, isPass]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoPoomsae;

const VideoContainer = styled.video`
  height: 26vw;
  width: 35vw;
  margin-bottom: 60px;
  border-radius: 10px;
`;
