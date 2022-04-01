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

function MainPage() {
  const { t } = useTranslation();
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
          url: "gyeorugi/normal",
        },
        {
          name: "rank",
          url: "",
        },
      ],
    },
  ];

  return (
    <div className="MainPage">
      <Background>
        <BackgroundVideo url="/videos/background.mp4"></BackgroundVideo>
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
