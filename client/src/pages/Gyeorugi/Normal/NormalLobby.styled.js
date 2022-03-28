import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";

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
  padding-top: 92px;
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const Standby = styled.div`
  height: 100%;
  width: 78%;
  padding-top: 4%;
  text-align: center;

  button {
    display: inline-block;
  }
`;

export const ChampionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  padding-bottom: 2.5rem;
`;

export const MyChampion = styled.div`
  width: 24%;
`;

export const ChampBackground = styled.img`
  width: 100%;
  height: auto;
`;

export const CounterChampion = styled.div`
  width: 24%;
`;

export const SearchLayout = styled.div`
  width: 22%;
  text-align: center;
  padding: 3rem 1rem;
  /* background-color: rgba(173, 181, 189, 0.2); */
  background-color: rgba(0, 0, 0, 0.5);
  /* filter: grayscale(100%) brightness(15%); */
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 30px;

  border: none;
  border-radius: 5px;
  background-color: ${colors.gray2};
`;

export const SearchList = styled.div``;

export const UserProfile = styled.div``;

export const UserImg = styled.img``;

export const UserTextBox = styled.div``;

export const UserName = styled.div``;

export const UserStatus = styled.div``;
