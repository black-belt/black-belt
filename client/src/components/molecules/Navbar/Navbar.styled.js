import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "_foundation";
import Dropdown from "./Dropdown";

export const Layout = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9998;

  padding: 0 4rem;

  width: 100%;
  height: 92px;
  /* background-color: ${colors.gray4}; */
  background-color: rgba(206, 212, 218, 0.2);

  transition: 0.5s;
`;

export const Logo = styled.img`
  cursor: pointer;
`;

export const ProfileImg = styled.div`
  cursor: pointer;
`;

export const Welcome = styled.span`
  color: ${colors.gray0};
`;

export const UserDropdown = styled(Dropdown)`
  z-index: 9999;
  top: 80px;
  right: 3.6rem;

  animation: 0.3s cubic-bezier(0.3, 0, 0, 1);
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

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const NavItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
