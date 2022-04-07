import React, { useEffect, useRef, useState } from "react";
import "./StreamComponent.css";

function OvVideoComponentSub({ user, mutedSound }) {
  const videoRef = useRef(null);
  console.log("난 subscribe");

  useEffect(() => {
    console.log("!!useEffect", videoRef);
    if (user && user.streamManager && !!videoRef) {
      console.log("!!1", videoRef);
      user.getStreamManager().addVideoElement(videoRef.current);
    }

    if (user && user.streamManager.session && !!videoRef) {
      console.log("!!2", videoRef);
      user.streamManager.session.on("signal:userChanged", (event) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }

    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
      // setWebCamElement(videoRef.current);
    });
  }, []);

  useEffect(() => {
    console.log("!!user", user);
    if (user && !!videoRef) {
      user.getStreamManager().addVideoElement(videoRef.current);
    }
  }, [user]);

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

  return (
    <video
      autoPlay={true}
      id={"video-" + user.getStreamManager().stream.streamId}
      ref={videoRef}
      muted={mutedSound}
    />
  );
}

export default OvVideoComponentSub;
