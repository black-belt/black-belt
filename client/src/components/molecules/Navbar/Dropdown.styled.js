import styled from "styled-components";
import { colors, fontWeight } from "_foundation";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 200px;
  border-radius: 6px;
  border: 1px solid ${colors.gray7};

  /* background-color: rgba(0, 0, 0, 0.77); */
  background-color: ${colors.gray4};
  opacity: 0.8;
  /* color: ${colors.gray0}; */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const UserInfo = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.gray8};
`;

export const UserName = styled.div`
  font-weight: ${fontWeight.medium};
`;

export const MenuBox = styled.div``;

export const DropdownItem = styled.div``;

export const Logout = styled.div``;
