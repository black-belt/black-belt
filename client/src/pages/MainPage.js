import BackgroundVideo, { Background } from "./MainPage.styled";

function MainPage() {
  return (
    <div className="MainPage">
      <Background>
        {/* <BackgroundVideo url="videos/background.mp4"></BackgroundVideo> */}
        <BackgroundVideo url="videos/background.mp4"></BackgroundVideo>
      </Background>
    </div>
  );
}

export default MainPage;
