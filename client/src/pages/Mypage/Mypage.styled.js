import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";

export const BackgroundImg = styled.img`
  filter: grayscale(100%) brightness(45%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;
export const Layout = styled.div`
  /* padding-top: 92px; */
  /* background-color: red; */

  padding: 0 12%;
  width: 100vw;
  height: 100vh;

  display: flex;

  color: ${colors.gray0};
`;

export const ProfileBox = styled.div`
  /* background-color: blue; */
  padding-top: 92px;
  width: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(49, 54, 59, 0.6);
  backdrop-filter: blur(4px) saturate(100%);
  -webkit-backdrop-filter: blur(4px) saturate(100%);
  /* gap: 0.5rem; */
  /* text-align: center; */
`;

export const ImgBox = styled.div`
  padding-top: 30%;
  padding-bottom: 0.8rem;
  width: 60%;
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

export const UserCountry = styled.div``;

export const Username = styled.div`
  font-size: ${fontSize.h4};
  font-weight: ${fontWeight.medium};
`;

export const UserEmail = styled.div`
  font-size: ${fontSize.standard};
  color: ${colors.gray2};
`;

export const TierImg = styled.img`
  filter: grayscale(100%) brightness(50%);
  padding-top: 3rem;
  width: 50%;
`;

export const MyInfo = styled.div``;

export const Carousel = styled.div``;

export const GyeorugiInfo = styled.div``;
