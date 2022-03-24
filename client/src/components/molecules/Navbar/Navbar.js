import { useRecoilState } from "recoil";
import { useState } from "react";

import LangBtn from "components/atoms/Buttons/lang-btn";
import Icon from "components/atoms/Icons/Icon";

import { loginModalState } from "recoils";
import { useTranslation } from "react-i18next";

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
  const [translateEN, setTranslateEn] = useState(false);

  const handleEnglish = () => {
    setTranslateEn(!translateEN);
    if (translateEN) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ko");
    }
  };
  const { t, i18n } = useTranslation();
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
            {t("로그인")}
          </NavItemBtn>
          <NavItemBtn onClick={() => setLoginModalOpen("signup")}>
            {t("회원가입")}
          </NavItemBtn>
          <LangBtn onClick={handleEnglish}>
            <Icon icon={t("언어")} />
            {t("언어")}
          </LangBtn>
        </NavItemBox>
      )}
    </Layout>
  );
}
export default Navbar;
