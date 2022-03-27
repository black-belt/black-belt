import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";

export const Layout = styled.div`
  padding-top: 92px;
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const Standby = styled.div`
  height: 100%;
  width: 75%;
  padding-top: 4%;
  text-align: center;

  background-color: black;

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
  width: 25%;
  background-color: blue;
`;

export const SearchInput = styled.div``;

export const SearchList = styled.div``;
