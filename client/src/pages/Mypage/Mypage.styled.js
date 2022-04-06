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
  /* background-color: red; */

  padding: 0 12%;
  width: 100vw;
  height: 100vh;

  display: flex;
  gap: 12%;

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
`;

export const ImgBox = styled.div`
  padding-top: 26%;
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

export const UserCountry = styled.div`
  /* position: absolute; */
  /* left: 0; */
  /* right: 20%; */
  /* top: 50%; */
  /* position: relative; */
  /* left: 70%; */
  /* top: -50px; */
  /* right: 100px; */
`;

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
  width: 65%;
`;

export const MyInfo = styled.div`
  /* background-color: yellow; */
  padding-top: 92px;
  width: 58%;
`;

export const Certification = styled.div`
  /* background-color: red; */
  padding-top: 8%;
  height: 48%;
`;

export const GyeorugiInfo = styled.div`
  /* background-color: blue; */
  /* margin-top: 2rem; */
  /* padding-top: 2rem; */
  /* height: 52%; */
  margin-top: 2rem;
  padding: 1rem 1.5rem;

  border-radius: 6px;

  background-color: rgba(248, 249, 250, 0.15);
  /* backdrop-filter: blur(4px) saturate(10%);
  -webkit-backdrop-filter: blur(4px) saturate(10%); */
`;

export const GyeorugiTR = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 0;

  border-bottom: 1px solid ${colors.gray9};
`;

export const RecentGames = styled.div`
  display: flex;
  gap: 0.6rem;

  img {
    width: 30px;
  }
`;
