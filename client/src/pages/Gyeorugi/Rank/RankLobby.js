import InButton from "components/atoms/Buttons/in-btns";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { userInfo } from "recoils";
import {
  Background,
  Champion,
  ChampionBox,
  ChampionInfo,
  ImgWrapper,
  Layout,
  Name,
  ProfileImg,
  ProfileImgBox,
  Tier,
} from "./RankLobby.styled";

function RankLobby() {
  const { t } = useTranslation();
  const myInfo = useRecoilValue(userInfo);
  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };
  console.log(myInfo);
  return (
    <Layout>
      <Background src="/images/practiceBackground.jpg" />
      <ChampionBox>
        <Champion>
          {myInfo && (
            <ChampionInfo>
              <Name>{myInfo.userNick}</Name>
              <ProfileImgBox>
                <ImgWrapper>
                  {myInfo.userProfilePath ? (
                    <ProfileImg src={myInfo.userProfilePath} alt="" />
                  ) : (
                    <ProfileImg src="/images/defaultUser.png" alt="" />
                  )}
                </ImgWrapper>
              </ProfileImgBox>
              <Tier language={t("language")}>{t(tier[myInfo.userTier])}</Tier>
            </ChampionInfo>
          )}
        </Champion>
      </ChampionBox>
      <center>
        <InButton>{t("start")}</InButton>
      </center>
    </Layout>
  );
}
export default RankLobby;
