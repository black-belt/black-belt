import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";
import Icon from "../Icons/Icon";

function InButton({ children, onClick }) {
  return (
    <StyledBtn onClick={onClick}>
      {children}
      <Icon state="default" icon="inPointer" />
      <Icon state="hover" icon="hoverPointer" />
    </StyledBtn>
  );
}
export default InButton;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width};
  height: 48px;
  padding: 0.4rem 1.2rem;

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

  .hover {
    display: none;
  }

  ${(props) =>
    css`
      :hover {
        background: ${colors.blue2};
        border: 1px solid ${colors.blue2};
        .default {
          display: none;
          transition: 0.2s;
        }
        .hover {
          display: inline-block;
          transition: 0.2s;
        }
      }
    `}

  svg {
    width: 22px;
    height: 22px;
    margin-left: 20px;
    vertical-align: top;
  }
`;
