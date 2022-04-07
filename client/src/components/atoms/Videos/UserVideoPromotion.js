import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as tmPose from "@teachablemachine/pose";
import { useTranslation } from "react-i18next";

function UserVideoPromotion({ testResult, isPass, startTimer, curNum, info, setCurMotion }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  let isStart = false;
  let answer;
  let model;

  const [webCamElement, setWebCamElement] = useState(undefined);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const changeModel = async (poomsae, chapter) => {
    model = await tmPose.load(
      `/models/combos/${(poomsae - 1) * 4 + chapter}/model.json`,
      `/models/combos/${(poomsae - 1) * 4 + chapter}/metadata.json`
    );
    // console.log("!!change", model, poomsae, chapter);
    // setModel(() => m);
  };

  const setWebcam = async () => {
    const size = 200;
    const flip = true;
    let webcam = await new tmPose.Webcam(size, size, flip);
    setWebCamElement(() => webcam);
  };

  const setReady = async () => {
    // console.log(info.randomPoomsaeId, curNum);
    if (curNum === 0) await changeModel(info.randomPoomsaeId, 1);
    else await changeModel(info.essentialPoomsaeId, 1);
    // console.log("!!model", model);
    await webCamElement.setup();
    await webCamElement.play();

    let cnt = 0;
    if (!isStart) {
      while (cnt < 5) {
        cnt += await isReady();
      }
      isStart = true;
      startTimer();
      run();
    }
  };

  const isReady = async () => {
    webCamElement.update(); // update the webcam frame
    const { posenetOutput } = await model.estimatePose(webCamElement.canvas);
    const prediction = await model.predictTopK(posenetOutput, 1);
    const className = prediction[0].className;
    const probability = prediction[0].probability;
    // console.log(className, probability);
    if (className === "Basic Ready Stance" && probability >= 0.8) {
      // console.log(className, probability);
      return 1;
    }
    return 0;
  };

  const analyzeImage = async () => {
    webCamElement.update(); // update the webcam frame
    const { posenetOutput } = await model.estimatePose(webCamElement.canvas);
    const prediction = await model.predictTopK(posenetOutput, 1);
    const className = prediction[0].className;
    const probability = prediction[0].probability;
    // console.log(className, probability);
    return { className: className, probability: probability };
  };

  const run = async () => {
    startTimer();
    let time;
    let totalCnt = 0;
    let probSum = 0;
    let motionCnt = 0;
    let maxProbability = 0;
    let curChapter = 1;
    let curIdx = 0;
    let explainIdx = 0;
    let answer, answerIndex;
    let explain;
    let poomsaeId;
    let isEnd = false;
    if (curNum === 0) {
      time = info.randomPoomsaeTime;
      info.randomAnswer.forEach((value) => (motionCnt += value.length));
      answer = info.randomAnswer;
      explain = t("language") === "KOR" ? info.randomPoomsaeExplain : info.randomPoomsaeExplainE;
      poomsaeId = info.randomPoomsaeId;
    } else {
      time = info.essentialPoomsaeTime;
      info.essentialAnswer.forEach((value) => (motionCnt += value.length));
      answer = info.essentialAnswer;
      explain =
        t("language") === "KOR" ? info.enssentialPoomsaeExplain : info.enssentialPoomsaeExplainE;
      poomsaeId = info.essentialPoomsaeId;
    }
    // console.log("!!answer", answer);
    // console.log("!!time, motionCnt", time, motionCnt);
    const loop = setInterval(async () => {
      if (++totalCnt % 40 === 0) {
        console.log("!!answer", curChapter, curIdx, answer[curChapter - 1][curIdx], maxProbability);
        probSum += maxProbability;
        maxProbability = 0;
        setCurMotion(explain[++explainIdx]);
        if (++curIdx === answer[curChapter - 1].length) {
          if (curChapter === 4) {
            isEnd = true;
          } else {
            curIdx = 0;
            curChapter++;
            await changeModel(poomsaeId, curChapter);
          }
        }
      }
      if (totalCnt === time * 20) {
        clearInterval(loop);
        console.log("!!end", probSum, motionCnt, probSum / motionCnt);
        testResult(probSum / motionCnt);
      }
      if (!isEnd) {
        let imageResult = await analyzeImage();
        if (
          answer[curChapter - 1][curIdx] === imageResult.className &&
          maxProbability < imageResult.probability
        ) {
          maxProbability = imageResult.probability;
        }
      }
    }, 50);
  };

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      // setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    if (!isPass) setWebcam();
  }, [answer, isPass]);

  useEffect(() => {
    // console.log("실행!");
    if (!isPass && webCamElement !== undefined) {
      setReady();
    }
  }, [webCamElement, curNum]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoPromotion;

const VideoContainer = styled.video`
  height: 55vh;
  width: 45vw;
  // margin-bottom: 60px;
  border-radius: 10px;
`;
