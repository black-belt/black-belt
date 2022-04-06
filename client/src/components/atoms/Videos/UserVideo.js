import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as tmPose from "@teachablemachine/pose";

function UserVideo({ answer, testResult, isPass, aiId }) {
  const videoRef = useRef(null);
  const modelURL = `/models/basics/${aiId}/model.json`;
  const metadataURL = `/models/basics/${aiId}/metadata.json`;
  let isFindMax = false;
  let maxProbability = 0.0;
  let frameCnt = 0;
  let answerNum = 0;

  const [model, setModel] = useState(undefined);
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
    while (answer !== "" && !isPass) {
      webCamElement.update(); // update the webcam frame
      const { posenetOutput } = await model.estimatePose(webCamElement.canvas);
      const prediction = await model.predictTopK(posenetOutput, 1);
      const className = prediction[0].className;
      const probability = prediction[0].probability;
      console.log(className, probability);
      if (isFindMax && answerNum >= 5) {
        if (++frameCnt > 20) {
          isFindMax = false;
          frameCnt = 0;
          testResult(maxProbability);
          break;
        }
        if (answer === className && probability > maxProbability) {
          maxProbability = probability;
        }
      } else if (answer === className) {
        isFindMax = true;
        maxProbability = probability;
        answerNum++;
        // const s = videoRef.current.srcObject;
        // s.getTracks().forEach((track) => {
        //   track.stop();
        // });
        // break;
      }
    }
  };

  useEffect(() => {
    if (webCamElement !== undefined && model !== undefined) {
      // console.log(aiId);
      run();
    }
  }, [webCamElement, model]);

  useEffect(() => {
    // if (!isPass)
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      setWebCamElement(videoRef.current);
      // run();
    });
  }, []);

  useEffect(() => {
    if (!isPass) setWebcam();
  }, [isPass, answer]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideo;

const VideoContainer = styled.video`
  height: 22vw;
  width: 35vw;
  margin-bottom: 60px;
  border-radius: 10px;
`;
