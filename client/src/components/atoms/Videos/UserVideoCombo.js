import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideoCombo({ answer, updateIsPass, testResult, setNextAction, isPass }) {
  const videoRef = useRef(null);
  let net;
  let nextAction = 0;
  let testAvg = 0.0;
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
    while (answer !== "" && answer.length > 0) {
      const img = await webcam.capture();
      const result = await net.classify(img);
      console.log(result[0].className, result[0].probability);
      img.dispose();
      const curActionIdx = answer.indexOf(result[0].className.split(",")[0]);
      if (curActionIdx >= 0 && curActionIdx !== nextAction - 1) {
        if (answer[nextAction] === result[0].className.split(",")[0]) {
          setNextAction(nextAction);
          nextAction++;
          testAvg += result[0].probability;
          if (nextAction === answer.length) {
            testResult(testAvg / answer.length);
            updateIsPass();
            // const s = videoRef.current.srcObject;
            // s.getTracks().forEach((track) => {
            //   track.stop();
            // });
            break;
          }
        } else {
          // 원래 다음동작이 아닌 동작을 했으면 처음부터 다시하게 하려했는데 실제로 안될거같음.. 프레임별로 계속 따는거라서 중간에 한부분을 인식했을경우 진행이안될듯
          // nextAction = 0;
          // setNextAction(nextAction);
          // testAvg = 0;
        }
      }
      await tf.nextFrame();
    }
  };

  useEffect(() => {
    if (!isPass)
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
        setWebCamElement(videoRef.current);
        // run();
      });
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

export default UserVideoCombo;

const VideoContainer = styled.video`
  height: 22vw;
  margin-bottom: 60px;
  border-radius: 10px;
`;
