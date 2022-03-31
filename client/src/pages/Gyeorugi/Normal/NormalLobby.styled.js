import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";

export const BackgroundImg = styled.img`
  filter: grayscale(100%) brightness(20%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

export const Layout = styled.div`
  /* padding-top: 92px; */
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const Standby = styled.div`
  height: 100%;
  width: 78%;
  background-color: red;
  /* padding-top: 4%; */
`;

export const ChampionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  padding-bottom: 2rem;
  /* height: 100vh; */
  height: 85%;
  /* width: 100%; */
  background-color: blue;
`;

export const Champion = styled.div`
  padding-top: 92px;
  /* position: absolute; */
  width: 24%;
  /* width: auto; */
  height: 100%;
  background-color: yellow;
  /* height: 500px; */
  background-image: url("/images/badge.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const ChampionInfo = styled.div`
  color: ${colors.gray0};
`;

export const Name = styled.div`
  font-size: ${fontSize.h4};
  font-weight: ${fontWeight.medium};
`;
export const ProfileImg = styled.img``;
export const Tier = styled.div``;

export const SearchLayout = styled.div`
  margin-top: 92px;
  width: 22%;
  text-align: center;
  padding: 3rem 1rem 3rem 1.5rem;
  /* background-color: rgba(173, 181, 189, 0.2); */
  background-color: rgba(0, 0, 0, 0.5);
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding-bottom: 1rem;
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 30px;

  border: none;
  border-radius: 5px;
  background-color: ${colors.gray2};
`;

export const SearchList = styled.div`
  color: ${colors.gray0};
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 0;

  /* cursor: pointer; */
`;

export const UserDetail = styled.div`
  position: absolute;
  right: 22%;
  /* z-index: 10000; */
  img {
    width: 300px;
  }
`;

export const UserImg = styled.img`
  ${(props) => {
    if (props.state === "N") {
      return css`
        filter: grayscale(100%) brightness(45%);
      `;
    }
  }}
`;

export const UserTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;

  padding: 0 0.4rem;
`;

export const UserName = styled.div`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.medium};
  color: ${colors.gray2};

  ${(props) => {
    if (props.state === "N") {
      return css`
        color: ${colors.gray6};
      `;
    }
    if (props.state === "Y") {
      return css`
        color: ${colors.gray0};
      `;
    }
  }}
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
`;

export const UserStatus = styled.div`
  padding: 0 0.4rem;
  font-size: ${fontSize.sm};

  color: ${(props) => props.state};
`;
