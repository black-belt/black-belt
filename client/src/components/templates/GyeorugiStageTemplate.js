import ScoreBar from "components/molecules/Gyeorugi/ScoreBar";
import StreamComponent from "components/molecules/Stream/StreamComponent";
import styled from "styled-components";
import { colors, fontWeight } from "../../_foundation";

function GyeorugiStageTempalte({
  dialog,
  localUser,
  subscribers,
  guide,
  isTimer,
  setIsTimer,
  leftPercent,
  rightPercent,
  answer,
  isEnd,
  isStart,
  start,
  attack,
  defence,
}) {
  console.log("구독", subscribers);
  return (
    <>
      <Container>
        {dialog}
        {!isTimer && <Guide>{guide}</Guide>}
        <ScoreContainer>
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined &&
            subscribers !== undefined && (
              <ScoreBar
                left={localUser}
                right={subscribers}
                isTimer={isTimer}
                setIsTimer={setIsTimer}
                leftPercent={leftPercent}
                rightPercent={rightPercent}
              />
            )}
        </ScoreContainer>
        <VideoLayout>
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <LocalUser>
              <StreamComponent
                user={localUser}
                answer={answer}
                isEnd={isEnd}
                isStart={isStart}
                start={start}
                attack={attack}
                defence={defence}
              />
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
  width: 41%;
  height: 57%;
  left: 70px;
  top: 30%;
`;

const RemoteUser = styled.div`
  position: absolute;
  width: 41%;
  height: 57%;
  right: 70px;
  top: 30%;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("/images/promotionBackground.jpg");
  background-size: 100% 100%;
  filter: grayscale(100%) brightness(90%);
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
`;

const Guide = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  color: ${colors.gray7};
  transform: translate(-50%, 0%);
  background-color: rgba(206, 212, 218, 0.7);
  padding: 20px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: ${fontWeight.medium};
`;
