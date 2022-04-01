import ScoreBar from "components/molecules/ScoreBar";
import StreamComponent from "components/molecules/Stream/StreamComponent";
import styled from "styled-components";

function GyeorugiStageTempalte({ dialog, localUser, subscribers }) {
  return (
    <>
      <Container>
        {dialog}
        <ScoreContainer>
          <ScoreBar />
        </ScoreContainer>
        <VideoLayout>
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <LocalUser>
              <StreamComponent user={localUser} />
            </LocalUser>
          )}
          {subscribers.map((sub, i) => (
            <RemoteUser>
              <StreamComponent key={i} user={sub} streamId={sub.streamManager.stream.streamId} />
            </RemoteUser>
          ))}
        </VideoLayout>
      </Container>
      <BackgroundImage />
    </>
  );
}
export default GyeorugiStageTempalte;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ScoreContainer = styled.div`
  width: 100%;
  height: 20%;
`;

const VideoLayout = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  min-width: 400px !important;
`;

const LocalUser = styled.div`
  position: absolute;
  width: 36%;
  height: 57%;
  left: 10%;
  top: 30%;
`;

const RemoteUser = styled.div`
  position: absolute;
  width: 36%;
  height: 57%;
  right: 10%;
  top: 30%;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("/images/promotionBackground.jpg");
  background-size: 100% 100%;
  filter: grayscale(100%) brightness(40%);
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
`;
