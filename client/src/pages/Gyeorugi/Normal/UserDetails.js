// import Icon from "components/atoms/Icons/CustomIcon";
import BasicButton from "components/atoms/Buttons/button";
import { Invite } from "pages/MainPage/startWS";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { gyeorugiToken } from "recoils";
import axiosInstance from "utils/API";
import {
  Contents,
  Gradient,
  Img,
  Layout,
  NoUserImg,
  ProfileBox,
  TextBox,
  TierImg,
  UserImg,
  Username,
  UserTier,
} from "./UserDetails.styled";

const UserDetail = (props) => {
  const { t } = useTranslation();
  const user = props.userData;
  const target = props.target;
  const token = useRecoilValue(gyeorugiToken);
  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };

  const data = {
    token: token,
    hostId: props.hostId,
    guestId: target,
  };

  const SendInvite = async () => {
    const answer = await axiosInstance.get(`/api/que/select/apply/${target}`);
    console.log(answer);
  };

  return (
    <Layout targetUser={target} user={user.userId}>
      <Img>
        {user.userprofilePath ? (
          <UserImg src={user.userprofilePath} alt="" />
        ) : (
          <>
            <NoUserImg src="/images/default-profile-gyeorugi.png" alt="" />
            <Gradient />
          </>
        )}
      </Img>
      <ProfileBox url={`/images/tier/${tier[user.tierId]}.png`}>
        <TierImg src={`/images/tier/${tier[user.tierId]}.png`} alt="" />
        <Contents>
          <TextBox>
            <Username>{user.userNick}</Username>
            <UserTier>{t(tier[user.tierId])}</UserTier>
          </TextBox>
          <BasicButton
            width="115px"
            height="36px"
            able={user.userState}
            onClick={() => Invite(data)}
          >
            {t("apply")}
          </BasicButton>
        </Contents>
      </ProfileBox>
    </Layout>
  );
};
export default UserDetail;
