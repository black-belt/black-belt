import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";

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

export const Title = styled.div`
  color: ${colors.gray9};
  font-family: "Dokdo";
  font-size: ${fontSize.h1};
  /* ${(props) => {
    if (props.language === "ENG") {
      return css`
        font-family: "Dry Brush";
        font-size: ${fontSize.h1};
      `;
    } else {
      return css`
        font-family: "Dokdo";
        font-size: ${fontSize.h2};
      `;
    }
  }} */
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  /* padding-top: 1rem; */
`;

export const NicknameInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 3px;
  border: none;
  background: ${colors.gray0};
  padding-left: 0.5rem;

  :focus {
    outline: 1px solid ${colors.blue2};
    border: none;
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  position: absolute;
  top: 180px;
  font-size: ${fontSize.standard};
`;

export const InputBox = styled.div`
  width: 65%;
`;

export const ButtonLight = styled.button`
  height: 33px;
  padding: 0 1rem;

  border: none;
  border-radius: 3px;

  color: ${colors.gray0};
  background: ${colors.blue2};
  cursor: pointer;

  :hover {
    background: ${colors.blue1};
  }

  :disabled {
    background: #97a5b2;
    color: ${colors.gray4};
    cursor: default;
  }
`;
