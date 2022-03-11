import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";

function InButton({ children }) {
  return <StyledBtn>{children}</StyledBtn>;
}
export default InButton;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width};
  height: 48px;
  padding: 0.6rem 1.75rem;

  border-radius: 4rem;
  border: 1px solid ${colors.gray0};
  color: ${colors.gray0};
  background-color: transparent;

  font-size: ${fontSize.xl};
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;

  transition: 0.2s;
  cursor: pointer;

  ${(props) =>
    css`
      :hover {
        background: ${colors.blue1};
      }
    `}

  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: top;
  }
`;
