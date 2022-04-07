import ScoreBar from "components/molecules/Gyeorugi/ScoreBar";
import StreamComponent from "components/molecules/Stream/StreamComponent";
import { useEffect } from "react";
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
  answerAttack,
  answerDefence,
  isEnd,
  isStart,
  start,
  attack,
  defence,
  end,
  myAttack,
  otherAttack,
  myDefence,
  otherDefence,
  reset,
  isRed,
}) {
  let leftLeft = Math.floor(Math.random() * (90 - 10)) + 10;
  let leftTop = Math.floor(Math.random() * (90 - 10)) + 10;
  let rightLeft = Math.floor(Math.random() * (90 - 10)) + 10;
  let rightTop = Math.floor(Math.random() * (90 - 10)) + 10;

  useEffect(() => {
    leftLeft = Math.floor(Math.random() * (90 - 10)) + 10;
    leftTop = Math.floor(Math.random() * (90 - 10)) + 10;
  }, [myAttack]);

  useEffect(() => {
    rightLeft = Math.floor(Math.random() * (90 - 10)) + 10;
    rightTop = Math.floor(Math.random() * (90 - 10)) + 10;
  }, [otherAttack]);

  console.log("!!localUser, subscribers", localUser, subscribers);

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
                leftPercent={leftPercent / 10}
                rightPercent={rightPercent / 10}
                end={end}
              />
            )}
        </ScoreContainer>
        <VideoLayout>
          {localUser !== undefined && localUser.getStreamManager() !== undefined && (
            <LocalUser>
              <StreamComponent
                user={localUser}
                answerAttack={answerAttack}
                answerDefence={answerDefence}
                isEnd={isEnd}
                isStart={isStart}
                start={start}
                attack={attack}
                defence={defence}
                reset={reset}
                end={end}
                isRed={isRed}
              />
              {myDefence !== 0 && <MyDefence defence={myDefence} src="/images/shield.png" />}
              {myAttack !== 0 && (
                <Attack left={leftLeft} top={leftTop}>
                  -{myAttack}
                </Attack>
              )}
            </LocalUser>
          )}
          {subscribers.map((sub, i) => (
            <RemoteUser>
              <StreamComponent
                user={sub}
                streamId={sub.streamManager.stream.streamId}
                start={start}
              />
              {/* {otherDefence !== 0 && (
                <OtherDefence defence={otherDefence} src="/images/shield.png" />
              )}
              {otherAttack !== 0 && (
                <Attack left={rightLeft} top={rightTop}>
                  -{otherAttack}
                </Attack>
              )} */}
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
  font-family: Dry Brush;
  color: #ed4c5c;
  font-size: 5rem;
  /* position: relative; */
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

const MyDefence = styled.img`
  width: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const OtherDefence = styled.img`
  width: 50px;
  position: absolute;
  top: 10px;
  left: 8px;
`;

const Attack = styled.div`
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.left}%;
`;
