import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "_foundation";

const img_URL = {
  kor: {
    url: "/images/logo_kor.png",
  },
  eng: { url: "/images/logo_navbar.png" },
};

export const Layout = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;

  padding: 0 4rem;

  width: 100%;
  height: 92px;
  /* background-color: ${colors.gray4}; */
  background-color: rgba(206, 212, 218, 0.2);

  transition: 0.5s;
`;

export const Logo = styled.div`
  img {
    width: 143px;
    height: 53px;
  }
`;

export const NavItemLink = styled(Link)`
  text-decoration: none;
  color: ${colors.gray0};
`;

export const NavItemBtn = styled.div`
  border: none;
  text-decoration: none;
  color: ${colors.gray0};

  cursor: pointer;
`;

export const NavItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
