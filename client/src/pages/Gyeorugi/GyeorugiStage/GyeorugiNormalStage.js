import StageBtn from "components/atoms/Buttons/stage-btn";
import EvaluationTemplateGyeorugi from "components/templates/EvaluationTemplateGyeorugi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";
import VideoRoomComponent from "../../../components/organisms/VideoRoom/VideoRoomComponent";

function NormalStage() {
  const [result, setResult] = useState(0);
  const [tier, setTier] = useState(undefined);
  const [isWin, setIsWin] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [myInfo, setMyInfo] = useState(undefined);
  const navigate = useNavigate();
  const state = useLocation();
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
    // const data = await axiosInstance.post("/api/battle", {
    //   hostId: state.hostId,
    //   guestId: state.guestId,
    //   isHost: state.isHost,
    //   roomSeq: state.roomSeq,
    // });
    // const imHost = state.isHost === 1 ? true : false;

    // const imHost = true;
    // const data = {
    //   token: undefined,
    //   battleInfo: [
    //     {
    //       isHost: "true",
    //       tierId: 1,
    //       userNick: "anonymous9",
    //       tierName: "브론즈",
    //       userScore: 999,
    //       countryName: "korea",
    //       tierNameE: "bronze",
    //       userId: 2,
    //       countryId: 3,
    //       defaultLang: "K",
    //     },
    //     {
    //       isHost: "false",
    //       tierId: 1,
    //       userNick: "anonymous11",
    //       userProfilePath: "C:\\var\\lib\\jenkins\\upload\\캡처_2022_02_22_15_06_14_185.png",
    //       tierName: "브론즈",
    //       userScore: 999,
    //       countryName: "korea",
    //       tierNameE: "bronze",
    //       userId: 12,
    //       countryId: 1,
    //       defaultLang: "K",
    //     },
    //   ],
    //   battleSeq: "5",
    //   message: "Success : Enter study room",
    //   statusCode: 200,
    // };

    const data = await axiosInstance.post("/api/battle", {
      hostId: 3,
      guestId: 4,
      isHost: 1,
      roomSeq: 100,
    });
    let imHost = true;
    setInfo(data);
    console.log("data!!", data);
    setMyInfo(imHost ? data.BattleInfo[0] : data.BattleInfo[1]);
    otherNick = imHost ? data.BattleInfo[1].userNick : data.BattleInfo[0].userNick;
  };

  useEffect(() => {
    getInfoData();
  }, []);

  useEffect(() => {
    console.log(result, isWin, "!!??");
    if (result === 1 && isWin !== undefined) {
      getResultData().then((result) => {
        // setIsWin(false);
        setTier({ tier: tiers[result.tierId], score: result.userScore });
      });
      // const data = getResultData();
      // console.log(data);
      // console.log(data, tiers[data.tierId], data.userScore);
      // setTier({ tier: tiers[data.tierId], score: data.userScore });
    }
  }, [result, isWin]);

  const getResultData = async () => {
    // const imHost = state.isHost === 1 ? true : false;
    // let data = {};
    const data = await axiosInstance.post("/api/battle/end", {
      // team: info.isHost === 1 ? "red" : "blue",
      team: "red",
      redWinLoseDraw: isWin ? "W" : "L",
      // battleSeq: info.battleInfo,
      battleSeq: info.BattleInfo,
      token: info.token,
    });
    // data.tierId = 1;
    // data.userScore = 999;
    return data;
  };

  const restartFunc = () => {
    navigate("/");
  };
  const homeFunc = () => {
    navigate("/");
  };

  return (
    <>
      {info && myInfo && (
        <VideoRoomComponent
          setResult={setResult}
          setIsWin={setIsWin}
          info={myInfo}
          token={info.token}
          otherNick={otherNick}
        />
      )}
      {tier !== undefined && isWin !== undefined ? (
        <EvaluationTemplateGyeorugi
          isWin={isWin}
          tier={tier}
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
export default NormalStage;
