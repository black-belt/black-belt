import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideo({ answer, testResult, isPass }) {
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
    while (answer !== "" && !isPass) {
      const img = await webcam.capture();
      const result = await net.classify(img);
      console.log(answer, isPass, result[0].className, result[0].probability);
      img.dispose();
      if (answer === result[0].className.split(",")[0]) {
        testResult(result[0].probability);
        // const s = videoRef.current.srcObject;
        // s.getTracks().forEach((track) => {
        //   track.stop();
        // });
        break;
      }
      await tf.nextFrame();
    }
  };

  useEffect(() => {
    // if (!isPass)
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      setWebCamElement(videoRef.current);
      // run();
    });
  }, []);

  useEffect(() => {
    if (!isPass) run();
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
  margin-bottom: 60px;
  border-radius: 10px;
`;
