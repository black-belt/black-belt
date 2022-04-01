import StageBtn from "components/atoms/Buttons/stage-btn";
import EvaluationTemplateGyeorugi from "components/templates/EvaluationTemplateGyeorugi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";
import VideoRoomComponent from "../../../components/organisms/VideoRoom/VideoRoomComponent";

function NormalStage() {
  const [result, setResult] = useState(0);
  const [tier, setTier] = useState(undefined);
  const [token, setToken] = useState(undefined);
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
    //   id: state.userId,
    //   isHost: state.isHost,
    //   roomSeq: state.roomSeq,
    // });
    // const imHost = state.isHost === 1 ? true : false;
    const imHost = true;
    const data = {
      token: undefined,
      battleInfo: [
        {
          isHost: "true",
          tierId: 1,
          userNick: "anonymous9",
          tierName: "브론즈",
          userScore: 999,
          countryName: "china",
          tierNameE: "bronze",
          userId: 2,
          countryId: 3,
          defaultLang: "K",
        },
        {
          isHost: "false",
          tierId: 1,
          userNick: "anonymous11",
          userProfilePath: "C:\\var\\lib\\jenkins\\upload\\캡처_2022_02_22_15_06_14_185.png",
          tierName: "브론즈",
          userScore: 999,
          countryName: "korea",
          tierNameE: "bronze",
          userId: 12,
          countryId: 1,
          defaultLang: "K",
        },
      ],
      battleSeq: "5",
      message: "Success : Enter study room",
      statusCode: 200,
    };
    setInfo(data);
    setMyInfo(imHost ? data.battleInfo[0] : data.battleInfo[1]);
    otherNick = imHost ? data.battleInfo[1].userNick : data.battleInfo[0].userNick;
  };

  useEffect(() => {
    getInfoData();
  }, []);

  useEffect(() => {
    if (result === 1) {
      getResultData().then((result) => {
        // setIsWin(false);
        setTier({ tier: tiers[result.tierId], score: result.userScore });
      });
      // const data = getResultData();
      // console.log(data);
      // console.log(data, tiers[data.tierId], data.userScore);
      // setTier({ tier: tiers[data.tierId], score: data.userScore });
    }
  }, [result]);

  const getResultData = async () => {
    let data = {};
    // const data = await axiosInstance.post("/api/battle/end", {
    //   team: "red",
    //   redWinLoseDraw: "W",
    //   battleSeq: 5,
    //   token: token,
    // });
    data.tierId = 1;
    data.userScore = 999;
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
      {tier !== undefined ? (
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
