import { useRecoilValue } from "recoil";
import { gyeorugiMsg, userInfo } from "recoils";
import { Carousel } from "3d-react-carousal";
import {
  BackgroundImg,
  Certification,
  // Carousel,
  GyeorugiInfo,
  GyeorugiTR,
  ImgBox,
  ImgWrapper,
  Layout,
  MyInfo,
  ProfileBox,
  ProfileImg,
  RecentGames,
  TierImg,
  UserCountry,
  UserEmail,
  Username,
} from "./Mypage.styled";
import CountryIcon from "components/atoms/Icons/CountryIcon";
import { useTranslation } from "react-i18next";

function MyPage() {
  const { t } = useTranslation();
  const user = useRecoilValue(userInfo);
  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };
  console.log(user);

  const slides = [
    <img src="/certifications/belt1.png" alt="" />,
    <img src="/certifications/belt2.png" alt="" />,
    <img src="/certifications/belt3.png" alt="" />,
    <img src="/certifications/belt4.png" alt="" />,
  ];

  const callback = function (index) {
    console.log("callback", index);
  };

  const infoTable = [
    {
      title: "score",
      contents: `${user.userWin} Wins  ${user.userLose} Loses  ${user.userDraw} Draws`,
    },
    {
      title: "recents",
      contents: "",
    },
    {
      title: "tier",
      contents: `${t(tier[user.userTier])}`,
    },
    {
      title: "points",
      contents: `${user.userScore} ${t("points unit")}`,
    },
    {
      title: "dan",
      contents: `${t(user.levelName)}`,
    },
  ];

  return (
    <div className="MyPage">
      <BackgroundImg src="/images/practiceBackground.jpg" alt="" />
      <Layout>
        <ProfileBox>
          <ImgBox>
            <ImgWrapper>
              {user.userProfilePath ? (
                <>
                  <ProfileImg src={user.userProfilePath} alt="" />
                </>
              ) : (
                // <ProfileImg src="/images/IMG_4070.JPG" alt="" />
                <ProfileImg src="images/defaultUser.png" alt="" />
              )}
              <UserCountry>
                {/* <CountryIcon icon={user.countryName} width="50" height="50" /> */}
                {/* <img src="images/defaultUser.png" alt="" /> */}
              </UserCountry>
            </ImgWrapper>
          </ImgBox>
          <Username>{user.userNick}</Username>
          <UserEmail>{user.userEmail}</UserEmail>
          <TierImg src={`/images/tier/${tier[user.userTier]}.png`} />
        </ProfileBox>
        <MyInfo>
          <Certification>
            <Carousel
              slides={slides}
              // autoplay={false}
              onSlideChange={callback}
            />
          </Certification>
          <GyeorugiInfo>
            {user &&
              infoTable.map((info) => (
                <GyeorugiTR key={info.title}>
                  <div>{t(info.title)}</div>
                  {info.title === "recents" ? (
                    <RecentGames>
                      {user.battleHistories.map((battle) => (
                        <img src={`/images/${battle.winLoseDraw}.png`} alt="" />
                      ))}{" "}
                    </RecentGames>
                  ) : (
                    <div>{info.contents}</div>
                  )}
                </GyeorugiTR>
              ))}
          </GyeorugiInfo>
        </MyInfo>
      </Layout>
    </div>
  );
}

export default MyPage;
