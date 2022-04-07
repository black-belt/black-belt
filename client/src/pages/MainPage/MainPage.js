import Slider from "react-animated-slider";
import "./carousel.css";
import BackgroundVideo, {
  Background,
  ButtonBox,
  Carousel,
  Contents,
  ImgBox,
  Layer,
  Layout,
  TextBox,
  Title,
} from "./MainPage.styled";
import { useTranslation } from "react-i18next";
import InButton from "components/atoms/Buttons/in-btns";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import isLogin from "utils/isLogin";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { loginModalState, message, userInfo } from "recoils";

import SockJs from "sockjs-client";
import StompJs from "stompjs";

function MainPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginModal = useSetRecoilState(loginModalState);
  const userId = useRecoilValue(userInfo);
  const msg = useSetRecoilState(message);
  const resetMsg = useResetRecoilState(message);

  const sock = new SockJs("https://j6a506.p.ssafy.io/stomp/");
  const stomp = StompJs.over(sock);

  const StartWS = (userId) => {
    try {
      stomp.connect({}, () => {
        stomp.subscribe(`/sub/api/que/user/${userId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          console.log(newMessage);
          msg(newMessage);
          if (newMessage.type === "REFUSE") {
            resetMsg();
          }
          if (newMessage.type === "ENTER") {
            if (newMessage.isHost === "0") {
              setTimeout(() => {
                navigate("/gyeorugi/normal/stage", {
                  state: {
                    isHost: newMessage.isHost,
                    hostId: newMessage.hostId,
                    guestId: newMessage.guestId,
                    roomSeq: newMessage.roomId,
                  },
                });
              }, 5000);
            } else {
              navigate("/gyeorugi/normal/stage", {
                state: {
                  isHost: newMessage.isHost,
                  hostId: newMessage.hostId,
                  guestId: newMessage.guestId,
                  roomSeq: newMessage.roomId,
                },
              });
            }
          }
        });
      });
    } catch (err) {
      console.log("error");
    }
  };

  const FilterUser = (url) => {
    if (isLogin()) {
      navigate(url);
    } else {
      loginModal("login");
    }
  };

  useEffect(() => {
    if (isLogin()) {
      StartWS(userId.userId);
    }
  }, [isLogin]);

  const slides = [
    {
      title: "practice mode",
      description: "practice mode explanation",
      description2: "practice mode explanation2",
      description3: "practice mode explanation3",
      image: "/images/main/basics.png",
      button: [
        {
          name: "basics",
          url: "/practice/basics",
        },
        {
          name: "combos",
          url: "/practice/combos",
        },
        {
          name: "poomsae",
          url: "/practice/poomsae",
        },
      ],
    },
    {
      title: "promotion test",
      description: "promotion test explanation",
      description2: "promotion test explanation2",
      description3: "promotion test explanation3",
      image: "/images/main/practice.png",
      button: [
        {
          name: "test start",
          url: "/promotion",
        },
      ],
    },
    {
      title: "gyeorugi",
      description: "gyeorugi explanation",
      description2: "gyeorugi explanation2",
      description3: "gyeorugi explanation3",
      image: "/images/main/gyeorugi.png",
      button: [
        {
          name: "normal",
          url: "gyeorugi/normal",
        },
        {
          name: "rank",
          url: "gyeorugi/rank",
        },
      ],
    },
  ];

  return (
    <div className="MainPage">
      <Background>
        <BackgroundVideo
          url={`${process.env.REACT_APP_IMAGE_URL}/background.mp4`}
        ></BackgroundVideo>
        <Layer></Layer>
      </Background>
      <Layout>
        <Slider>
          {slides.map((slide) => (
            <Carousel key={slide.title}>
              <TextBox>
                <Title language={t("language")}>{t(slide.title)}</Title>
                <Contents>{t(slide.description)}</Contents>
                <Contents>{t(slide.description2)}</Contents>
                <Contents>{t(slide.description3)}</Contents>
                <ButtonBox>
                  {slide["button"].map((menus) => (
                    <InButton key={menus.name} onClick={() => FilterUser(menus.url)}>
                      {t(menus.name)}
                    </InButton>
                  ))}
                </ButtonBox>
              </TextBox>
              <ImgBox>
                <img src={slide.image} alt="" />
              </ImgBox>
            </Carousel>
          ))}
        </Slider>
      </Layout>
    </div>
  );
}

export default MainPage;
