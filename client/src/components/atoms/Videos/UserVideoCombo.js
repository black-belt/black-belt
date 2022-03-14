import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideoCombo({ answer, testResult, updateNextAction, isPass }) {
  const videoRef = useRef(null);
  let net;
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

  const run = async () => {
    net = await mobilenet.load();
    const webcam = await tf.data.webcam(webCamElement, {
      resizeWidth: 220,
      resizeHeight: 227,
    });
    let testSum = 0.0;
    let nextAction = 0;
    while (answer.length > 0 && !isPass) {
      const img = await webcam.capture();
      const result = await net.classify(img);
      console.log(answer, isPass, nextAction, result[0].className, result[0].probability);
      img.dispose();
      if (answer[nextAction] === result[0].className.split(",")[0]) {
        nextAction++;
        updateNextAction(nextAction);
        testSum += result[0].probability;
        if (nextAction === answer.length) {
          testResult(testSum);
          testSum = 0;
          nextAction = 0;
          // const s = videoRef.current.srcObject;
          // s.getTracks().forEach((track) => {
          //   track.stop();
          // });
          break;
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
    if (!isPass) run();
  }, [answer, isPass]);

  return (
    <>
      <VideoContainer ref={videoRef} autoPlay />
    </>
  );
}

export default UserVideoCombo;

const VideoContainer = styled.video`
  height: 22vw;
  margin-bottom: 60px;
  border-radius: 10px;
`;
