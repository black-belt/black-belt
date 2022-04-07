import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";

export const Layout = styled.div`
  height: 100vh;
  width: 100vw;

  /* display: flex; */
`;

export const Background = styled.img`
  filter: grayscale(100%) brightness(20%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

export const ChampionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  padding-bottom: 2rem;
  height: 85%;

  /* background-color: blue; */
`;

export const ChampionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;

  padding-top: 4rem;
  color: ${colors.gray0};
`;

export const Champion = styled.div`
  padding-top: 92px;
  width: 18%;
  height: 100%;
  /* background-color: yellow; */

  background-image: url("/images/badge.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const Name = styled.div`
  font-size: ${fontSize.h4};
  font-weight: ${fontWeight.medium};

  span {
    padding: 0 0.3rem;
  }
`;

export const ProfileImgBox = styled.div`
  width: 65%;
`;

export const ImgWrapper = styled.div`
  position: relative;
  padding-top: 100%;
  border-radius: 100%;
  overflow: hidden;
`;

export const ProfileImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  width: auto;
`;

export const Tier = styled.div`
  padding: 2rem 0;
  ${(props) => {
    if (props.language === "ENG") {
      return css`
        font-family: "Dry Brush";
        font-size: ${fontSize.h1};
      `;
    } else {
      return css`
        font-family: "Dokdo";
        font-size: ${fontSize.h1};
      `;
    }
  }}
`;
