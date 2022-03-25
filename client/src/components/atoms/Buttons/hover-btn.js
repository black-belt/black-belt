import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";

function HoverBtn({ children, onClick, text }) {
  return (
    <StyledBtn onClick={onClick}>
      <Text>{text}</Text>
    </StyledBtn>
  );
}
export default HoverBtn;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
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

  transition: 0.15s;
  cursor: pointer;

  .hover {
    display: none;
  }

  ${(props) =>
    css`
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
    `}
`;

const Text = styled.div`
  opacity: 0;
  transition: 0.07s;
  ${StyledBtn}:hover & {
    opacity: 1;
  }
`;
