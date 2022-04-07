import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as tmPose from "@teachablemachine/pose";

function UserVideoCombo({ answer, testResult, updateNextAction, isPass, aiId }) {
  const videoRef = useRef(null);
  const modelURL = `/models/combos/${aiId}/model.json`;
  const metadataURL = `/models/combos/${aiId}/metadata.json`;
  let testSum = 0.0;
  let nextAction = 1;
  let curAction = 0;
  let isLastAction = false;
  let maxProbability = 0.0;
  let frameCnt = 0;

  const [model, setModel] = useState(undefined);
  const [webCamElement, setWebCamElement] = useState();

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

  const setWebcam = async () => {
    let m = await tmPose.load(modelURL, metadataURL);
    setModel(() => m);
    const size = 200;
    const flip = true;
    let webcam = await new tmPose.Webcam(size, size, flip);
    setWebCamElement(() => webcam);
  };

  const run = async () => {
    await webCamElement.setup();
    await webCamElement.play();
    while (answer.length > 0 && !isPass) {
      webCamElement.update(); // update the webcam frame
      const { posenetOutput } = await model.estimatePose(webCamElement.canvas);
      const prediction = await model.predictTopK(posenetOutput, 1);
      const className = prediction[0].className;
      const probability = prediction[0].probability;
      console.log(className, probability);
      if (isLastAction) {
        //마지막 동작
        frameCnt++;
        if (answer[curAction] === className) {
          maxProbability = probability;
        }
        if (frameCnt > 40) {
          // console.log("!!저장", curAction, maxProbability);
          testSum += maxProbability;
          frameCnt = 0;
          testResult(testSum);
          testSum = 0;
          nextAction = 1;
          curAction = 0;
          maxProbability = 0;
          break;
        }
      } else if (answer[curAction] === className && probability > maxProbability) {
        //하던동작, 더 높은 일치율
        maxProbability = probability;
        updateNextAction(nextAction);
      } else if (answer[nextAction] === className) {
        //다음동작 발견됨 -> 다음동작으로 넘어감
        // console.log("!!저장", curAction, maxProbability);
        testSum += maxProbability;
        maxProbability = probability;
        curAction = nextAction++;
        if (nextAction === answer.length) {
          isLastAction = true;
        }
      }
    }
  };

  useEffect(() => {
    if (webCamElement !== undefined && model !== undefined) {
      console.log(aiId);
      run();
    }
  }, [webCamElement, model]);

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      // setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    if (!isPass) setWebcam();
  }, [answer, isPass]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoCombo;

const VideoContainer = styled.video`
  height: 26vw;
  width: 35vw;
  margin-bottom: 60px;
  border-radius: 10px;
`;
