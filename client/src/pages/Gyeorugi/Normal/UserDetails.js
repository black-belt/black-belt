// import Icon from "components/atoms/Icons/CustomIcon";
import BasicButton from "components/atoms/Buttons/button";
import InButton from "components/atoms/Buttons/in-btns";
import { useTranslation } from "react-i18next";
import {
  Layout,
  ProfileBox,
  UserImg,
  Username,
  UserTier,
} from "./UserDetails.styled";

const UserDetail = (props) => {
  const { t } = useTranslation();
  console.log(props.userData);
  const user = props.userData;
  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };

  return (
    <Layout>
      {/* <Icon icon="gyeorugiUserDetailBackground" width={376} height={189} /> */}
      {/* <img src="/images/userDetailBackground.png" alt="" /> */}
      <UserImg src={user.userprofilePath} alt="" />
      <ProfileBox>
        <Username>{user.userNick}</Username>
        <UserTier>{tier[user.tierId]}</UserTier>
        <BasicButton width="115px" height="36px">
          {t("apply")}
        </BasicButton>
      </ProfileBox>
    </Layout>
  );
};
export default UserDetail;
