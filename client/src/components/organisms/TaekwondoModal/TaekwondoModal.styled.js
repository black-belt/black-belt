import styled from "styled-components";
import { colors } from "_foundation";

export const OverLay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  animation: modal-show 0.3s cubic-bezier(0.3, 0, 0, 1);
`;

export const ModalBox = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;

  text-align: center;
`;

export const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  position: relative;
  top: 50%;

  width: 400px;
  height: 250px;
  margin: auto;
  padding: 1rem;
  border-radius: 10px;

  background-color: ${colors.gray3};
  backdrop-filter: blur(30px);
  transform: translateY(-50%);
  animation: 0.4s cubic-bezier(0.3, 0, 0, 1);
`;

export const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 10001;

  Svg {
    width: 28px;
    cursor: pointer;
  }
`;
