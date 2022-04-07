import styled from "styled-components";
import { colors, fontSize } from "_foundation";

export const OverLay = styled.div`
  /* position: fixed;
  top: 150px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  /* background-color: rgba(0, 0, 0, 0.6); */
  /* backdrop-filter: blur(15px); */
  /* animation: modal-show 0.3s cubic-bezier(0.3, 0, 0, 1); */
`;

export const ModalBox = styled.div`
  position: fixed;

  top: 180px;
  right: 25px;
  /* bottom: 0; */
  /* left: 0; */
  z-index: 10000;

  /* text-align: center; */
`;

export const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* gap: 2rem; */
  position: relative;
  top: 50%;

  width: 350px;
  height: 140px;
  /* margin: auto; */
  padding: 1rem;
  border-radius: 10px;

  /* background-color: rgba(222, 226, 230, 0.2); */

  background-color: rgba(73, 80, 87, 0.45);
  backdrop-filter: blur(10px);
  transform: translateY(-50%);
  animation: 0.4s cubic-bezier(0.3, 0, 0, 1);
`;

export const ModalHeader = styled.div`
  /* background-color: yellow; */
  /* height: 30px; */
  height: 32%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${colors.gray1};
  font-family: "Dry Brush";
  font-size: ${fontSize.h4};

  Svg {
    /* width: 28px; */
    padding-top: 3px;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  /* background-color: red; */
  height: 68%;
  padding: 0.5rem 0;

  color: ${colors.gray1};
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  padding: 0.5rem;
`;

// export const
