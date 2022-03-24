import BackgroundVideo, {
  Background,
  ButtonBox,
  Carousel,
  Contents,
  Layer,
  Layout,
  Title,
} from "./MainPage.styled";
import { useTranslation } from "react-i18next";

// import i18n from "i18next";

function MainPage() {
  const { t, i18n } = useTranslation();

  const changelanguageToKo = () => i18n.changeLanguage("ko");
  const changelanguageToEn = () => i18n.changeLanguage("en");

  // const
  return (
    <div className="MainPage">
      <Background>
        <BackgroundVideo url="videos/background.mp4"></BackgroundVideo>
      </Background>
      <Layer></Layer>
      <Layout>
        <Title></Title>
        <Contents></Contents>
        <ButtonBox></ButtonBox>
        <Carousel></Carousel>
      </Layout>
      {/* <h1>{t("hello")}</h1>
      <button onClick={changelanguageToKo}>Korean</button>
      <button onClick={changelanguageToEn}>English</button> */}
    </div>
  );
}

export default MainPage;
