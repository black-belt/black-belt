import StageBtn from "components/atoms/Buttons/stage-btn";
import EvaluationTemplateGyeorugi from "components/templates/EvaluationTemplateGyeorugi";
import VSTemplate from "components/templates/VSTemplate";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";
import VideoRoomComponent from "../../../components/organisms/VideoRoom/VideoRoomComponent";

function GyeorugiNormalStage() {
  const [result, setResult] = useState(0);
  const [tier, setTier] = useState(undefined);
  const [isWin, setIsWin] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [myInfo, setMyInfo] = useState(undefined);
  const [red, setRed] = useState(undefined);
  const [blue, setBlue] = useState(undefined);
  const [introduce, setIntroduce] = useState(true);
  const navigate = useNavigate();
  const state = useLocation().state;
  let otherNick;

  const tiers = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "dia",
    6: "master",
  };

  const getInfoData = async () => {
    // console.log(state, state.hostId, state.guestId, state.isHost, state.roomSeq);
    const data = await axiosInstance.post("/api/battle", {
      hostId: state.hostId,
      guestId: state.guestId,
      isHost: state.isHost ? 0 : 1,
      roomSeq: state.roomSeq,
    });
    let imHost = state.isHost;
    setInfo(data);
    // console.log("!!data", data, data.battleInfo[0].isHost, data.battleInfo[0].isHost === true);
    setMyInfo(imHost ? data.battleInfo[0] : data.battleInfo[1]);
    otherNick = imHost ? data.battleInfo[1].userNick : data.battleInfo[0].userNick;

    if (imHost) {
      setRed(data.battleInfo[0]);
      setBlue(data.battleInfo[1]);
    } else {
      setBlue(data.battleInfo[0]);
      setRed(data.battleInfo[1]);
    }
  };

  useEffect(() => {
    getInfoData();
    setTimeout(() => {
      setIntroduce(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (result === 1 && isWin !== undefined) {
      getResultData().then((result) => {
        setTier({ tier: tiers[result.tierId], score: result.userScore });
      });
    }
  }, [result, isWin]);

  const getResultData = async () => {
    const data = await axiosInstance.post("/api/battle/end", {
      team: state.isHost ? "red" : "blue",
      redWinLoseDraw: isWin ? "W" : "L",
      battleSeq: info.battleSeq,
      token: info.token,
      isRank: 0,
    });
    // data.tierId = 1;
    // data.userScore = 999;
    return data;
  };

  const restartFunc = () => {
    navigate("/gyeorugi/normal");
  };
  const homeFunc = () => {
    navigate("/");
  };

  return (
    <>
      {introduce && red && blue && <VSTemplate red={red} blue={blue} />}
      {!introduce && info && myInfo && (
        <VideoRoomComponent
          setResult={setResult}
          setIsWin={setIsWin}
          info={myInfo}
          token={info.token}
          otherNick={otherNick}
        />
      )}
      {isWin !== undefined ? (
        <EvaluationTemplateGyeorugi
          isWin={isWin}
          // tier={tier}
          restart={<StageBtn onClick={restartFunc}>다시하기</StageBtn>}
          home={
            <StageBtn onClick={homeFunc} isHome>
              홈으로 이동
            </StageBtn>
          }
        />
      ) : null}
    </>
  );
}
export default GyeorugiNormalStage;
