import React from "react";
import styled from "styled-components";
import { colors, fontSize } from "_foundation";

function DotButton({ children, onClick, text, isActive }) {
  return (
    <StyledBtn onClick={onClick} isActive={isActive}>
      <Text isActive={isActive}>{text}</Text>
    </StyledBtn>
  );
}
export default DotButton;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.isActive ? "150px" : "13px")};
  height: ${(props) => (props.isActive ? "48px" : "13px")};
  /* padding: 0.4rem 1.2rem; */

  border-radius: 4rem;
  border: 1px solid ${colors.gray7};
  color: ${colors.gray0};
  background-color: ${colors.gray7};

  font-family: inherit;
  font-size: ${fontSize.xl};
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;

  transition: 0.25s ease-out;
  cursor: pointer;

  :hover {
    /* background: ${colors.blue2}; */
    /* border: 1px solid ${colors.blue2}; */
    width: 150px;
    height: 48px;
    .default {
      display: none;
      transition: 0.2s;
    }
    .hover {
      display: inline-block;
      transition: 0.2s;
    }
  }
`;

const Text = styled.div`
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: all 0.15s ease-in;
  ${StyledBtn}:hover & {
    opacity: 1;
  }
`;
