import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
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

function MainPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const slides = [
    {
      title: "practice mode",
      description: "practice mode explanation",
      description2: "practice mode explanation2",
    },
    {
      title: "promotion test",
      description: "promotion test explanation",
      description2: "promotion test explanation2",
    },
    {
      title: "gyeorugi",
      description: "gyeorugi explanation",
      description2: "gyeorugi explanation2",
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
        <Carousel>
          <TextBox>
            <Title language={t("language")}>{t(titleMode["practice"])}</Title>
            <Contents>{t(explanations["practice"])}</Contents>
            <ButtonBox>
              {buttons["practice"].map((menus) => (
                <InButton key={menus.title} onClick={() => navigate(menus.url)}>
                  {t(menus.title)}
                </InButton>
              ))}
            </ButtonBox>
          </TextBox>
          <ImgBox>
            <img src="/images/practice.png" alt="" />
          </ImgBox>
        </Carousel>
      </Layout>
      {/* <h1>{t("hello")}</h1>
      <button onClick={changelanguageToKo}>Korean</button>
      <button onClick={changelanguageToEn}>English</button> */}
    </div>
  );
}

export default MainPage;
