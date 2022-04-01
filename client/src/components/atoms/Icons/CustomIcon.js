import React from "react";
import { icons } from "_foundation";
import styled, { css } from "styled-components";

const Icon = ({ langState, icon, block, state, width, height, ...props }) => {
  return (
    <Svg
      langState={langState}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      block={block}
      state={state}
      icon={icon}
      // stroke="currentColor"
      {...props}
    >
      {icons[icon]}
    </Svg>
  );
};

export default Icon;

const Svg = styled.svg`
  display: ${(props) => (props.block ? "block" : "inline-block")};
  ${(props) => {
    if (props.state === "N") {
      return css`
        filter: grayscale(100%) brightness(45%);
      `;
    }

    if (props.langState && props.langState !== props.icon) {
      return css`
        filter: grayscale(100%) brightness(45%);
      `;
    }
  }}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
  stroke-width: 2;
  /* stroke-linecap: round;
  stroke-linejoin: round; */
  // view-box: 0 0 ${(props) => props.viewSize} ${(props) => props.viewSize};
  // width: ${(props) => props.viewSize};
  // height: ${(props) => props.viewSize};
`;
