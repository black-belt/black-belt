import BackgroundVideo, {
  Background,
  ButtonBox,
  Carousel,
  Contents,
  Layer,
  Layout,
  TextBox,
  Title,
} from "./MainPage.styled";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import InButton from "components/atoms/Buttons/in-btns";
import { modesData } from "recoils";

// import i18n from "i18next";

function MainPage() {
  const { t, i18n } = useTranslation();

  const changelanguageToKo = () => i18n.changeLanguage("ko");
  const changelanguageToEn = () => i18n.changeLanguage("en");

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
    // practice: [
    //   {
    //     basics: "basics",
    //     combos: "combos",
    //     poomsae: "poomsae",
    //   },
    // ],
    practice: ["basics", "combos", "poomsae"],
    promotion: {
      dan: "need api",
    },
    gyeorugi: {
      noraml: "normal",
      rank: "rank",
    },
  };
  return (
    <div className="MainPage">
      <Background>
        <BackgroundVideo url="videos/background.mp4"></BackgroundVideo>
        <Layer></Layer>
      </Background>
      <Layout>
        <TextBox>
          {/* {modesData.map(({ name, title, explanation }) => (
            <Title language={t("language")}>{t(titleMode["practice"])}</Title>
          ))} */}
          <Title language={t("language")}>{t(titleMode["practice"])}</Title>
          <Contents>{t(explanations["practice"])}</Contents>
          <ButtonBox>
            {buttons["practice"].map((menu) => (
              <InButton>{t(menu)}</InButton>
            ))}
          </ButtonBox>
        </TextBox>
        <Carousel></Carousel>
      </Layout>
      {/* <h1>{t("hello")}</h1>
      <button onClick={changelanguageToKo}>Korean</button>
      <button onClick={changelanguageToEn}>English</button> */}
    </div>
  );
}

export default MainPage;
