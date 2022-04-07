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
import { message, userInfo } from "recoils";

import SockJs from "sockjs-client";
import StompJs from "stompjs";

function MainPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
          msg(newMessage);
          if (newMessage.type === "REFUSE") {
            resetMsg();
          }
        });
      });
    } catch (err) {
      console.log("error");
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
      button: [
        {
          name: "combos",
          url: "/practice/combos",
        },
      ],
    },
    {
      title: "gyeorugi",
      description: "gyeorugi explanation",
      description2: "gyeorugi explanation2",
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
                <ButtonBox>
                  {slide["button"].map((menus) => (
                    <InButton
                      key={menus.name}
                      onClick={() => navigate(menus.url)}
                    >
                      {t(menus.name)}
                    </InButton>
                  ))}
                </ButtonBox>
              </TextBox>
              <ImgBox>
                <img src="/images/practice.png" alt="" />
              </ImgBox>
            </Carousel>
          ))}
        </Slider>
      </Layout>
    </div>
  );
}

export default MainPage;
