// import Icon from "components/atoms/Icons/CustomIcon";
import BasicButton from "components/atoms/Buttons/button";
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
  const tierInfo = {
    1: { tier: "bronze", url: "" },
    2: { tier: "silver", url: "" },
    3: { tier: "gold", url: "" },
    4: { tier: "platinum", url: "" },
    5: { tier: "diamond", url: "" },
    6: { tier: "master", url: "" },
  };

  return (
    <Layout>
      {/* <Icon icon="gyeorugiUserDetailBackground" width={376} height={189} /> */}
      {/* <img src="/images/userDetailBackground.png" alt="" /> */}
      <UserImg src={user.userprofilePath} alt="" />
      <ProfileBox>
        <Username>{user.userNick}</Username>
        <UserTier>{tierInfo[user.tierId].tier}</UserTier>
        <BasicButton width="115px" height="36px">
          {t("apply")}
        </BasicButton>
      </ProfileBox>
    </Layout>
  );
};
export default UserDetail;
