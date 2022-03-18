import BackgroundVideo, { Background, Layer } from "./MainPage.styled";

function MainPage() {
  return (
    <div className="MainPage">
      <Background>
        {/* <BackgroundVideo url="videos/background.mp4"></BackgroundVideo> */}
        <BackgroundVideo url="videos/background.mp4"></BackgroundVideo>
      </Background>
      <Layer></Layer>
    </div>
  );
}

export default MainPage;
