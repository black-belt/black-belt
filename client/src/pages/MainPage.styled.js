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
  background: rgba(0, 0, 0, 0.66);
`;

export const Layout = styled.div`
  padding-top: 92px;
  width: 100%;
  height: 100%;
`;

export const TextBox = styled.div`
  /* padding-top: 14%;
  padding-left: 14%; */

  color: ${colors.gray0};
`;

export const Title = styled.div`
  color: ${colors.gray0};

  ${(props) =>
    props.language === "ENG" &&
    css`
      font-family: Dry Brush;
      font-size: 5rem;
      line-height: 150%;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      font-family: Dokdo;
      font-size: 6.5rem;
      line-height: 120%;
    `}
`;

export const Contents = styled.div`
  width: 46%;
  font-size: ${fontSize.xl};
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 1.2rem;
  padding-top: 2.8rem;
`;

export const Carousel = styled.div``;
