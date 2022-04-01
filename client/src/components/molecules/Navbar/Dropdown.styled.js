import styled from "styled-components";
import { colors, fontSize, fontWeight } from "_foundation";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  right: 3.6rem;

  width: 200px;
  border-radius: 6px;
  border: 1px solid ${colors.gray5};

  background-color: rgba(206, 212, 208, 0.8);
  /* background-color: ${colors.gray4}; */
  /* opacity: 0.85; */
  /* color: ${colors.gray0}; */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const UserInfo = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.gray5};
`;

export const UserName = styled.div`
  font-weight: ${fontWeight.medium};
  font-size: ${fontSize.xl};
`;

export const UserEmail = styled.div`
  font-size: ${fontSize.standard};
  color: ${colors.gray7};
`;

export const LangBox = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.gray5};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Select = styled.div``;

export const IconBox = styled.div`
  display: flex;
  gap: 0.3rem;

  cursor: pointer;
`;

export const MenuBox = styled.div`
  padding: 6px 0;

  border-bottom: 1px solid ${colors.gray5};
`;

export const DropdownItem = styled.div`
  padding: 6px 16px;
  cursor: pointer;

  :hover {
    background-color: ${colors.gray5};
  }
`;

export const Logout = styled.div`
  margin: 6px 0;
  padding: 6px 16px;
  cursor: pointer;

  :hover {
    background-color: ${colors.gray5};
  }
`;
