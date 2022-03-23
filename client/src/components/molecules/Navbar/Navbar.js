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
        <img src="/images/logo.png" alt="" />
      </Logo>
      {isLogin() ? (
        <NavItemBox>
          <div>for test</div>
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
