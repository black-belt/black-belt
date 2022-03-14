import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideoPoomsae({
  answer,
  updateIsPass,
  testResult,
  setNextAction,
  isPass,
  setPartIndex,
  // partIndex,
}) {
  const videoRef = useRef(null);
  let net;
  let nextAction = 0;
  let partIndex = 0;
  let testAvg = 0.0;
  let curActionIdx = 0;
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
    while (answer !== "" && answer.length > 0 && nextAction < answer.length) {
      const img = await webcam.capture();
      const result = await net.classify(img);
      console.log(partIndex, nextAction, answer, result[0].className, result[0].probability);
      img.dispose();
      // curActionIdx = answer.indexOf(result[0].className.split(",")[0]);
      // if (curActionIdx >= 0) {
      if (answer[nextAction] === result[0].className.split(",")[0]) {
        testAvg += result[0].probability;
        nextAction++;
        if (nextAction === answer.length) {
          //현단락에서 마지막동작
          setNextAction(0);
          nextAction = 0;
          if (partIndex === 3) {
            //마지막 단락
            setPartIndex(0);
            partIndex = 0;
            testResult(testAvg);
            updateIsPass();
            // const s = videoRef.current.srcObject;
            // s.getTracks().forEach((track) => {
            //   track.stop();
            // });
            break;
          } else {
            partIndex = partIndex + 1;
            setPartIndex((current) => current + 1);
          }
        } else {
          setNextAction((current) => current + 1);
        }
      } else {
        curActionIdx = -1;
      }
      // }
      await tf.nextFrame();
    }
  };

  useEffect(() => {
    if (!isPass) {
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
        setWebCamElement(videoRef.current);
        // run();
      });
    }
  }, [isPass]);

  useEffect(() => {
    run();
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
