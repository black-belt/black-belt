import styled from "styled-components";
import { colors, fontSize } from "_foundation";
import ReactPlayer from "react-player/lazy";

function BackgroundVideo({ url }) {
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
      playing={true}
      loop={true}
      controls={false}
    />
  );
}
export default BackgroundVideo;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; */
  background-size: cover;
`;

export const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
