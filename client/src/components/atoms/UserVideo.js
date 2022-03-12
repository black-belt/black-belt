import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

function UserVideo({ basicNumber, updateIsPass }) {
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
    while (true) {
      const img = await webcam.capture();
      const result = await net.classify(img);
      console.log(result[0].className, result[0].probability);
      img.dispose();
      if (basicNumber === result[0].className.split(",")[0]) {
        updateIsPass();
        break;
      }
      await tf.nextFrame();
    }
  };

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      setWebCamElement(videoRef.current);
      run();
    });
  }, []);

  // useEffect(() => {
  //   if (isCamReady) {
  //     console.log("빰!");
  //     run();
  //   }
  // }, [isCamReady]);

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
