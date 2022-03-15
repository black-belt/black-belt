import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, fontSize } from "_foundation";

export const Overlay = styled.div`
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
  gap: 2rem;
  position: relative;
  top: 50%;

  width: 400px;
  height: 360px;
  margin: auto;
  padding: 1rem;
  border-radius: 10px;

  background-color: ${colors.gray0};
  backdrop-filter: blur(30px);
  transform: translateY(-50%);
  animation: 0.4s cubic-bezier(0.3, 0, 0, 1);
`;

export const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;

  svg {
    width: 28px;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 3rem;
`;

export const Logo = styled.div`
  padding: 2.8rem 0 2.5rem 0;
  text-align: center;
  img {
    width: 240px;
    height: 85px;
  }
`;

export const Footer = styled.div`
  margin: 3rem 0;
  color: ${colors.gray5};
  font-size: ${fontSize.standard};
`;

export const FooterLink = styled(Link)`
  margin-left: 10px;
  color: ${colors.gray7};
  font-size: ${fontSize.standard};
  text-decoration: none;
`;
