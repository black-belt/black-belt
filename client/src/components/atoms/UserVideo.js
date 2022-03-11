import { useRef, useEffect } from "react";
import styled from "styled-components";

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

function UserVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return <VideoContainer ref={videoRef} autoPlay />;
}

export default UserVideo;

const VideoContainer = styled.video`
  width: 100%;
  height: 50%;
`;
