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

// export const Slider = styled.div`
//   padding: 92px 16% 0 16%;
//   /* width: 100vw; */
//   height: 100vh;
//   overflow: hidden;
//   & a {
//     &.previousButton,
//     &.nextButton {
//       font-size: 22px;
//       line-height: 0;
//       display: block;
//       position: absolute;
//       top: 50%;
//       transform: translateY(-50%);
//       transition: all 0.3s linear;
//       z-index: 1;
//       color: #333;
//       padding: 10px;
//       text-decoration: none;
//       backface-visibility: hidden; /* prevent jump effect when scaling */

//       &:not(.disabled):hover {
//         transform: translateY(-50%) scale(1.25);
//         cursor: pointer;
//       }
//     }

//     &.previousButton {
//       left: 20px;
//     }

//     &.nextButton {
//       right: 20px;
//     }
//   }
// `;

export const Layout = styled.div`
  /* padding: 92px 16% 0 16%; */
  /* padding: 0 16%; */
  /* width: 100vw; */
  height: 100vh;

  /* vertical-align: middle; */
`;

export const Carousel = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  padding: 0 16%;
  /* width: 100%;
  height: 100%; */
`;

export const TextBox = styled.div`
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
  font-size: ${fontSize.xl};
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 1.2rem;
  padding-top: 2.8rem;
`;

export const ImgBox = styled.div`
  display: flex;
  align-items: center;

  height: 400px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);

  img {
    width: 400px;
  }
`;
