import styled, { css } from "styled-components";
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

// const ReactPlayer = styled.video`
//   z-index: 0;
// `;
export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  z-index: -1;
  /* height: 100%; */
  /* background-size: cover; */
`;

export const Layer = styled.div`
  position: absolute;
  top: 0;
  /* left: 0; */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const Layout = styled.div`
  padding-top: 92px;
`;

export const TextBox = styled.div`
  padding-top: 12%;
  padding-left: 16%;
`;

export const Title = styled.div`
  font-size: ${fontSize.h1};
  color: ${colors.gray0};

  ${(props) =>
    props.language === "ENG" &&
    css`
      font-family: Dry Brush;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      color: red;
    `}
`;

export const Contents = styled.div``;

export const Carousel = styled.div``;

export const ButtonBox = styled.div``;
