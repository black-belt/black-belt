import {
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
  return (
    <div className="MyPage">
      <Layout>
        <ProfileBox>
          <ImgBox>
            <ImgWrapper>{/* <ProfileImg /> */}</ImgWrapper>
          </ImgBox>
          <UserCountry></UserCountry>
          <Username></Username>
          <UserEmail></UserEmail>
          {/* <TierImg/> */}
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
