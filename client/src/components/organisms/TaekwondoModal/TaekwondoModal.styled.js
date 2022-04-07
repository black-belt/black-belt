import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";

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

  /* text-align: center; */
`;

export const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 1rem;
  position: relative;
  top: 50%;

  width: 800px;
  /* height: 250px; */
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
  padding: 1rem 1rem 0 1rem;
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
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  padding: 0 1rem;
  /* gap: 1.2rem; */
  /* padding-top: 1rem; */
`;

export const ContentTitle = styled.div`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.medium};
  padding: 1rem 0 0.5rem 0;
`;

export const Contents = styled.div``;
