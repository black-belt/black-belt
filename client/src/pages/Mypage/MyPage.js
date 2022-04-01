import { useRecoilValue } from "recoil";
import { userInfo } from "recoils";
import {
  BackgroundImg,
  Carousel,
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
          <Carousel></Carousel>
          <GyeorugiInfo></GyeorugiInfo>
        </MyInfo>
      </Layout>
    </div>
  );
}

export default MyPage;
