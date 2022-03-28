import { GetUserInfo, UserProfileSelector } from "api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const userData = GetUserInfo();
  useEffect(() => {
    setUser(UserProfileSelector(userData));
  }, []);

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
      <UserInfo>
        <UserName>nickname</UserName>
        <UserEmail>useremail@email.com</UserEmail>
      </UserInfo>
      <MenuBox>
        {menus.map((menu) => (
          <DropdownItem>{t(menu.title)}</DropdownItem>
        ))}
      </MenuBox>
      <Logout>{t("logout")}</Logout>
    </Layout>
  );
};
export default Dropdown;
