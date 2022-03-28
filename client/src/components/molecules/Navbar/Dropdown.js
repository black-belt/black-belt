import { GetUserInfo, UserProfileSelector } from "api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";
import {
  DropdownItem,
  Layout,
  Logout,
  MenuBox,
  UserEmail,
  UserInfo,
  UserName,
} from "./Dropdown.styled";

const Dropdown = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const userData = GetUserInfo();

  useEffect(() => {
    if (userData.data) {
      setUser(UserProfileSelector(userData.data));
    }
  }, [userData.data]);

  const UserLogout = async () => {
    const res = await axiosInstance.put("/api/user/logout", {
      userId: user.id,
    });
    localStorage.removeItem("blackbelt_token");
    window.location.reload();
  };

  const menus = [
    {
      title: "about tkd",
      url: "",
    },
    {
      title: "mypage",
      url: "/mypage",
    },
  ];
  return (
    <Layout>
      {user && (
        <UserInfo>
          <UserName>{user.nickname}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
      )}
      <MenuBox>
        {menus.map((menu) => (
          <DropdownItem key={menu.title} onClick={() => navigate(menu.url)}>
            {t(menu.title)}
          </DropdownItem>
        ))}
      </MenuBox>
      <Logout onClick={UserLogout}>{t("logout")}</Logout>
    </Layout>
  );
};
export default Dropdown;
