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
  padding-top: 92px;
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const Standby = styled.div`
  height: 100%;
  width: 78%;
  padding-top: 4%;
`;

export const ChampionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;

  padding-bottom: 2rem;
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

  padding: 0.7rem 0;

  cursor: pointer;
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
