import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "_foundation";

export const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;

  width: 100%;
  background-color: ${colors.gray4};
  opacity: 0.2;

  transition: 0.5s;
`;

export const NavItemLink = styled(Link)`
  text-decoration: none;
  color: ${colors.gray0};
`;

export const NavItemBox = styled.div`
  display: flex;
  align-items: center;
`;
