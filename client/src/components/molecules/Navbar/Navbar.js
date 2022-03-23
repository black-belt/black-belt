import LangBtn from "components/atoms/Buttons/lang-btn";
import Icon from "components/atoms/Icons/Icon";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginModalState } from "recoils";
import isLogin from "utils/isLogin";
import {
  Layout,
  Logo,
  NavItemBox,
  NavItemBtn,
  NavItemLink,
} from "./Navbar.styled";

function Navbar({ navItemData }) {
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  return (
    <Layout>
      <Logo>
        <img src="/images/logo_navbar.png" alt="" />
      </Logo>
      {isLogin() ? (
        <NavItemBox>
          <div>for test</div>
          {/* [TODO]: api 연결 후 업데이트 예정 */}
          {/* {navItemData.map(({ name, title, url }) => (
              {title}
            </NavItemLink>
          ))} */}
        </NavItemBox>
      ) : (
        <NavItemBox>
          <NavItemBtn onClick={() => setLoginModalOpen("login")}>
            로그인
          </NavItemBtn>
          <NavItemBtn onClick={() => setLoginModalOpen("signup")}>
            회원가입
          </NavItemBtn>
          <LangBtn>
            <Icon icon="korean" />
            KOR
          </LangBtn>
        </NavItemBox>
      )}
    </Layout>
  );
}
export default Navbar;
