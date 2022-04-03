import { useRecoilValue } from "recoil";
import { userInfo } from "recoils";
import { Carousel } from "3d-react-carousal";
import {
  BackgroundImg,
  Certification,
  // Carousel,
  GyeorugiInfo,
  ImgBox,
  ImgWrapper,
  Layout,
  MyInfo,
  ProfileBox,
  ProfileImg,
  TierImg,
  UserCountry,
  UserEmail,
  Username,
} from "./Mypage.styled";

function MyPage() {
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
  return (
    <div className="MyPage">
      <BackgroundImg src="/images/practiceBackground.jpg" alt="" />
      <Layout>
        <ProfileBox>
          <ImgBox>
            <ImgWrapper>
              {user.userProfilePath ? (
                <ProfileImg src={user.userProfilePath} alt="" />
              ) : (
                // <ProfileImg src="/images/IMG_4070.JPG" alt="" />
                <ProfileImg src="images/defaultUser.png" alt="" />
              )}
            </ImgWrapper>
          </ImgBox>
          <UserCountry></UserCountry>
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
          <GyeorugiInfo>here</GyeorugiInfo>
        </MyInfo>
      </Layout>
    </div>
  );
}

export default MyPage;
