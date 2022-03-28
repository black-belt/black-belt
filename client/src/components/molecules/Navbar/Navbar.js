import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

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
import axiosInstance from "utils/API";
import { useNavigate } from "react-router-dom";

function Navbar({ navItemData }) {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  const [translateEN, setTranslateEn] = useState(false);
  const { t, i18n } = useTranslation();

  const getUserInfo = async () => {
    const { userInfo } = await axiosInstance.get("/api/user/userinfo", {});
    console.log(userInfo);
    return userInfo;
  };

  useEffect(() => {
    if (isLogin()) {
      getUserInfo();
    }
  }, [isLogin]);

  const handleEnglish = () => {
    setTranslateEn(!translateEN);
    if (translateEN) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ko");
    }
  };

  return (
    <Layout>
      <Logo src={t("logo url")} alt="" onClick={() => navigate("/")} />
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
            {t("login")}
          </NavItemBtn>
          <NavItemBtn onClick={() => setLoginModalOpen("signup")}>
            {t("signup")}
          </NavItemBtn>
          <LangBtn onClick={handleEnglish}>
            <Icon icon={t("language")} />
            {t("language")}
          </LangBtn>
        </NavItemBox>
      )}
    </Layout>
  );
}
export default Navbar;
