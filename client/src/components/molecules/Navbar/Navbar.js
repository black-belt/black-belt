import { Suspense, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import LangBtn from "components/atoms/Buttons/lang-btn";
import Icon from "components/atoms/Icons/CustomIcon";

import { language, loginModalState, userInfo } from "recoils";
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

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [translateEN, setTranslateEn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const setLoginModalOpen = useSetRecoilState(loginModalState);
  const setSelectedLang = useSetRecoilState(language);
  const { t } = useTranslation();
  const user = useRecoilValue(userInfo);

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
      setSelectedLang("en");
    } else {
      setSelectedLang("ko");
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
                  <img src={user.profileImg} alt="" />
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
