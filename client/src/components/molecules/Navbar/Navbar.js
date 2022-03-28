import { Suspense, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LangBtn from "components/atoms/Buttons/lang-btn";
import Icon from "components/atoms/Icons/CustomIcon";

import { loginModalState, userInfo } from "recoils";
import { useTranslation } from "react-i18next";

import isLogin from "utils/isLogin";
import {
  Layout,
  Logo,
  NavItemBox,
  NavItemBtn,
  // NavItemLink,
  ProfileBox,
  ProfileImg,
  UserDropdown,
  Welcome,
} from "./Navbar.styled";

import { useNavigate } from "react-router-dom";
import { GetUserInfo, UserProfileSelector } from "api";

function Navbar({ navItemData }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  // const [user, setUser] = useState(null);
  const [translateEN, setTranslateEn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);
  const { t, i18n } = useTranslation();

  const [userData, setUserData] = useState(null);
  const user = useRecoilValue(userInfo);
  console.log(user);

  // const userData = GetUserInfo();
  // useEffect(() => {
  //   if (userData && userData.data) {
  //     setUser(UserProfileSelector(userData.data));
  //   }
  // }, [userData.data]);

  useEffect(() => {
    const pageClickEvent = (event) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(!dropdownOpen);
      }
    };
    if (dropdownOpen) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [dropdownOpen]);

  const handleEnglish = () => {
    setTranslateEn(!translateEN);
    if (translateEN) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ko");
    }
  };

  return (
    <Layout ref={dropdownRef}>
      <Logo src={t("logo url")} alt="" onClick={() => navigate("/")} />
      {isLogin() ? (
        <Suspense fallback={<div>Loading ...</div>}>
          {user && (
            <ProfileBox>
              <Welcome>
                {t("welcome")} {user?.userNick}
                {t("welcome_korean")}
              </Welcome>
              {user.profileImg ? (
                <ProfileImg onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img src={user.profileImg} />
                </ProfileImg>
              ) : (
                <ProfileImg onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <Icon width={40} height={40} icon="defaultUser" />
                </ProfileImg>
              )}
            </ProfileBox>
          )}
          {dropdownOpen && <UserDropdown />}
        </Suspense>
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
