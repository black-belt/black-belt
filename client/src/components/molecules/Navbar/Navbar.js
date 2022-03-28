import { useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import LangBtn from "components/atoms/Buttons/lang-btn";
import Icon from "components/atoms/Icons/CustomIcon";

import { loginModalState } from "recoils";
import { useTranslation } from "react-i18next";

import isLogin from "utils/isLogin";
import {
  Layout,
  Logo,
  NavItemBox,
  NavItemBtn,
  NavItemLink,
  ProfileBox,
  ProfileImg,
  Welcome,
} from "./Navbar.styled";
import axiosInstance from "utils/API";
import { useNavigate } from "react-router-dom";

function Navbar({ navItemData }) {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  const [translateEN, setTranslateEn] = useState(false);
  const { t, i18n } = useTranslation();

  const getUserInfo = async () => {
    const userInfo = await axiosInstance.get("/api/user/userinfo", {});
    console.log(userInfo);
    return userInfo;
  };

  const query = useQuery("userInfo", getUserInfo);

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
        <>
          {!query.isLoading && query.data && (
            <ProfileBox>
              <Welcome>
                {t("welcome")} {query.data.userNick}
                {t("welcome_korean")}
              </Welcome>
              {query.data.userProfilePath ? (
                <ProfileImg>
                  <img src={query.data.userProfilePath} />
                </ProfileImg>
              ) : (
                <ProfileImg>
                  <Icon width={40} height={40} icon="defaultUser" />
                </ProfileImg>
              )}
            </ProfileBox>
          )}
        </>
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
