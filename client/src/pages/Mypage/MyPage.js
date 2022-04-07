import { useRecoilState, useRecoilValue } from "recoil";
import { changeNickname, userInfo } from "recoils";
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
import axiosInstance from "utils/API";
import { useEffect, useRef, useState } from "react";
import axiosImage from "utils/imageAPI";
import ChangeNickModal from "components/organisms/ChangeNickModal/ChangeNickModal";

function MyPage() {
  const { t } = useTranslation();
  const user = useRecoilValue(userInfo);
  const fileInput = useRef(null);
  const [isOpen, setIsOpen] = useRecoilState(changeNickname);
  console.log(isOpen);

  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };

  const [profileImg, setProfileImg] = useState("");
  const [defaultImg, setDefaultImg] = useState("");

  useEffect(() => {
    if (user.userProfilePath) {
      setProfileImg(user.userProfilePath);
      setDefaultImg(user.userProfilePath);
    } else {
      setProfileImg("/images/defaultUser.png");
      setDefaultImg("/images/defaultUser.png");
    }
  }, []);

  let imgData = new FormData();
  imgData.append("uploadFile", profileImg);

  useEffect(() => {
    if (profileImg !== defaultImg) {
      axiosImage.post("/api/user/uploadprofile", imgData);
    }
  }, [profileImg]);

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      console.log("selected");
      setProfileImg(e.target.files[0]);
      imgData.append("uploadFile", profileImg);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const slides = [
    <img src="/certifications/belt1.png" alt="" />,
    <img src="/certifications/belt2.png" alt="" />,
    <img src="/certifications/belt3.png" alt="" />,
    <img src="/certifications/belt4.png" alt="" />,
  ];

  const callback = function (index) {
    // console.log("callback", index);
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
  console.log(user);

  return (
    <div className="MyPage">
      <BackgroundImg src="/images/practiceBackground.jpg" alt="" />
      <Layout>
        {isOpen && <ChangeNickModal />}
        <ProfileBox>
          <ImgBox>
            <ImgWrapper>
              {user.userProfilePath ? (
                <ProfileImg
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  src={profileImg}
                  alt=""
                />
              ) : (
                <ProfileImg
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  src={profileImg}
                  alt=""
                />
              )}
              <UserCountry>
                {/* <CountryIcon icon={user.countryName} width="50" height="50" /> */}
                {/* <img src="images/defaultUser.png" alt="" /> */}
              </UserCountry>
            </ImgWrapper>
          </ImgBox>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={uploadImg}
            ref={fileInput}
          />
          <Username onClick={() => setIsOpen(true)}>{user.userNick}</Username>
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
                        <img
                          key={battle.battleHistoryId}
                          src={`/images/${battle.winLoseDraw}.png`}
                          alt=""
                        />
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
