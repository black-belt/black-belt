import { GetUserInfo, UserProfileSelector } from "api";
import Icon from "components/atoms/Icons/CustomIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { language, taekwondoModal, token } from "recoils";
import axiosInstance from "utils/API";
import {
  DropdownItem,
  IconBox,
  LangBox,
  Layout,
  Logout,
  MenuBox,
  Select,
  UserEmail,
  UserInfo,
  UserName,
} from "./Dropdown.styled";

const Dropdown = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const userData = GetUserInfo();
  const resetToken = useResetRecoilState(token);
  const setLang = useSetRecoilState(language);
  const setIsOpen = useSetRecoilState(taekwondoModal);

  useEffect(() => {
    if (userData.data) {
      setUser(UserProfileSelector(userData.data));
    }
  }, [userData.data]);

  const UserLogout = async () => {
    await axiosInstance.put("/api/user/logout", {
      userId: user.id,
    });
    resetToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <Layout>
      {user && (
        <UserInfo>
          <UserName>{user.nickname}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
      )}
      <LangBox>
        <Select>{t("select language")}</Select>
        <IconBox>
          <Icon
            width={25}
            height={25}
            icon="KOR"
            langState={t("language")}
            onClick={() => setLang("ko")}
          />
          <Icon
            width={25}
            height={25}
            icon="ENG"
            langState={t("language")}
            onClick={() => setLang("en")}
          />
        </IconBox>
      </LangBox>
      <MenuBox>
        <DropdownItem onClick={() => setIsOpen(true)}>
          {t("about tkd")}
        </DropdownItem>
        <DropdownItem onClick={() => navigate("/mypage")}>
          {t("mypage")}
        </DropdownItem>
      </MenuBox>
      <Logout onClick={UserLogout}>{t("logout")}</Logout>
    </Layout>
  );
};
export default Dropdown;
