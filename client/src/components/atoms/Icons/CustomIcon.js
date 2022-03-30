import React from "react";
import { icons } from "_foundation";
import styled from "styled-components";

const Icon = ({ icon, block, viewBox, width, height, ...props }) => {
  return (
    <Svg
      viewBox={viewBox}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      block={block}
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
