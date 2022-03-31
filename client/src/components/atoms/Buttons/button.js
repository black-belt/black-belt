import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";
import Icon from "../Icons/Icon";

function BasicButton({ able, width, height, fontSize, children }) {
  return (
    <StyledBtn width={width} height={height} fontSize={fontSize} able={able}>
      {children}
    </StyledBtn>
  );
}
export default BasicButton;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 0.6rem 1.5rem;

  border-radius: 4rem;
  border: 1px solid ${colors.gray0};
  color: ${colors.gray0};
  background-color: transparent;

  font-size: ${(props) => props.fontSize};
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;

  transition: 0.2s;
  cursor: pointer;

  ${(props) => {
    if (props.able === "Y") {
      return css`
        :hover {
          background: ${colors.blue1};
          border: 1px solid ${colors.blue1};
        }
      `;
    } else {
      return css`
        cursor: default;
      `;
    }
  }}
  /* ${(props) => {
    if (props.able) {
      return;
      css`
        :hover {
          background: ${colors.blue1};
          border: 1px solid ${colors.blue1};
        }
      `;
    }
  }} */

  svg {
    width: 22px;
    height: 22px;
    margin-left: 20px;
    vertical-align: top;
  }
`;
