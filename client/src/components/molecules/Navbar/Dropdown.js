import { GetUserInfo, UserProfileSelector } from "api";
import { useEffect, useState } from "react";
import {
  DropdownItem,
  Layout,
  Logout,
  MenuBox,
  UserInfo,
  UserName,
} from "./Dropdown.styled";

const Dropdown = () => {
  const [user, setUser] = useState(null);
  const userData = GetUserInfo();
  useEffect(() => {
    setUser(UserProfileSelector(userData));
  }, []);
  return (
    <Layout>
      <UserInfo>
        <UserName>nickname</UserName>
        useremail@email.com
      </UserInfo>
      <MenuBox>
        hihi
        <DropdownItem></DropdownItem>
      </MenuBox>
      <Logout></Logout>
    </Layout>
  );
};
export default Dropdown;
