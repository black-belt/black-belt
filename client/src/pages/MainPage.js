import Slider from "react-animated-slider";
import "./carousel.css";
// import "react-animated-slider/build/horizontal.css";
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
  // Slider,
} from "./MainPage.styled";
import { useTranslation } from "react-i18next";
import InButton from "components/atoms/Buttons/in-btns";
import { useNavigate } from "react-router-dom";
import { splitRealAndImagArrays } from "@tensorflow/tfjs-core/dist/backends/complex_util";

function MainPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
          url: "",
        },
        {
          name: "rank",
          url: "",
        },
      ],
    },
  ];

  const titleMode = {
    practice: "practice mode",
    promotion: "promotion test",
    gyeorugi: "gyeorugi",
  };
  const explanations = {
    practice: "practice mode explanation",
    practice2: "practice mode explanation2",
    promotion: "promotion test explanation",
    promotion2: "promotion test explanation2",
    gyeorugi: "gyeorugi explanation",
    gyeorugi2: "gyeorugi explanation2",
  };
  const buttons = {
    practice: [
      {
        title: "basics",
        url: "/practice/basics",
      },
      {
        title: "combos",
        url: "/practice/combos",
      },
      {
        title: "poomsae",
        url: "/practice/poomsae",
      },
    ],
    promotion: [
      {
        title: "need api",
        url: "/promotion",
      },
    ],
    gyeorugi: [
      {
        title: "normal",
        url: "",
      },
      {
        title: "rank",
        url: "",
      },
    ],
  };
  return (
    <div className="MainPage">
      <Background>
        <BackgroundVideo url="/videos/background.mp4"></BackgroundVideo>
        <Layer></Layer>
      </Background>
      <Layout>
        <Slider>
          {slides.map((slide) => (
            <Carousel>
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
      {/* <h1>{t("hello")}</h1>
      <button onClick={changelanguageToKo}>Korean</button>
      <button onClick={changelanguageToEn}>English</button> */}
    </div>
  );
}

export default MainPage;
