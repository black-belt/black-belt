import React, { useEffect, useRef, useState } from "react";
import "./StreamComponent.css";
import * as tmPose from "@teachablemachine/pose";

function OvVideoComponent({ user, mutedSound, answer, isEnd, isStart, start, attack, defence }) {
  const videoRef = useRef(null);
  const modelURL = `/models/gyeorugi/model.json`;
  const metadataURL = `/models/gyeorugi/metadata.json`;

  const [model, setModel] = useState(undefined);
  const [webCamElement, setWebCamElement] = useState(undefined);

  useEffect(() => {
    if (user && user.streamManager && !!videoRef) {
      user.getStreamManager().addVideoElement(videoRef.current);
    }

    if (user && user.streamManager.session && !!videoRef) {
      user.streamManager.session.on("signal:userChanged", (event) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }

    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    if (user && !!videoRef) {
      user.getStreamManager().addVideoElement(videoRef.current);
    }
  }, [user, mutedSound]);

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

  const setReady = async () => {
    await webCamElement.setup();
    await webCamElement.play();

    while (!isStart) {
      await isReady();
    }
  };

  const isReady = async () => {
    webCamElement.update(); // update the webcam frame
    const { posenetOutput } = await model.estimatePose(webCamElement.canvas);
    const prediction = await model.predictTopK(posenetOutput, 1);
    const className = prediction[0].className;
    const probability = prediction[0].probability;
    console.log(className, probability);
    if (className === "Ready Action" && probability >= 0.6) {
      start();
    }
  };

  const analyzeImage = async () => {
    webCamElement.update(); // update the webcam frame
    const { posenetOutput } = await model.estimatePose(webCamElement.canvas);
    const prediction = await model.predictTopK(posenetOutput, 1);
    const className = prediction[0].className;
    const probability = prediction[0].probability;
    console.log(className, probability);
    //내가 공격인지 판단하고 공격이면 신호보냄
  };

  const run = async () => {
    let cnt = 0;
    let maxProbability = 0.0;
    let testSum = 0.0;
    const loop = setInterval(() => {
      console.log(cnt++);
      analyzeImage();
      if (cnt === 80 * 20) {
        testSum += maxProbability;
        maxProbability = 0;
        // motionResult(testSum);
        testSum = 0;
        clearInterval(loop);
      }
    }, 50);
  };

  useEffect(() => {
    if (isStart) {
      run();
    }
  }, [isStart]);

  useEffect(() => {
    if (webCamElement !== undefined && model !== undefined) {
      setReady();
    }
  }, [webCamElement, model]);

  useEffect(() => {
    if (!isEnd) setWebcam();
  }, [isEnd, answer]);

  return (
    <video
      autoPlay={true}
      id={"video-" + user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={mutedSound}
    />
  );
}

export default OvVideoComponent;
