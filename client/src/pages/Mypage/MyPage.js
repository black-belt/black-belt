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
import axiosInstance from "utils/API";
import { useEffect, useRef, useState } from "react";
import axiosImage from "utils/imageAPI";

function MyPage() {
  const { t } = useTranslation();
  const user = useRecoilValue(userInfo);
  const fileInput = useRef(null);
  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };

  const [fileImg, setFileImg] = useState("");
  const [profileImg, setProfileImg] = useState("/images/defaultUser.png");

  // const saveFileImg = (e) => {
  //   setFileImg(URL.createObjectURL(e.target.files[0]));
  //   setProfileImg(e.target.files[0]);
  // };

  let imgData = new FormData();
  imgData.append("uploadFile", profileImg);
  console.log(imgData);

  // useEffect(() => {
  //   imgData.append("uploadFile", profileImg);
  // }, [profileImg]);

  useEffect(() => {
    if (profileImg !== "/images/defaultUser.png") {
      axiosImage.post("/api/user/uploadprofile", imgData).then((res) => {
        console.log(res);
      });
    }
  }, [profileImg]);

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      console.log("selected");
      setProfileImg(e.target.files[0]);
      imgData.append("uploadFile", profileImg);
      //   axiosImage
      //     .post("/api/user/uploadprofile", {
      //       imgData,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     });
      //   // }
      //   if (profileImg) {
      //     console.log("axios");
      //     axiosImage
      //       .post("/api/user/uploadprofile", {
      //         profileImg,
      //       })
      //       .then((res) => {
      //         console.log(res);
      //       });
      //   }
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // const uploadImg = async () => {
  //   const res = await axiosImage.post("/api/user/uploadprofile", {
  //     profileImg,
  //   });
  //   console.log(res);
  // };
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
        <ProfileBox>
          <ImgBox>
            <ImgWrapper>
              {user.userProfilePath ? (
                <ProfileImg
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  src={user.userProfilePath}
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
            id="file"
            accept="image/*"
            onChange={uploadImg}
            ref={fileInput}
          />
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
