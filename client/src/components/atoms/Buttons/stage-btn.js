import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";
import Icon from "../Icons/Icon";

function StageBtn({ children, isHome, onClick }) {
  return (
    <StyledBtn onClick={onClick}>
      <Icon icon={isHome ? "home" : "restart"} />
      {children}
    </StyledBtn>
  );
}
export default StageBtn;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width};
  height: 48px;
  padding: 0.6rem 1.5rem;

  border-radius: 4rem;
  border: 1px solid ${colors.gray0};
  color: ${colors.gray0};
  background-color: transparent;

  font-family: inherit;
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
        border: 1px solid ${colors.blue1};
      }
    `}

  svg {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    vertical-align: top;
  }
`;
