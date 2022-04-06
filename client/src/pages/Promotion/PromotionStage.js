import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StageBtn from "components/atoms/Buttons/stage-btn";
import PromotionStageTemplate from "components/templates/PromotionStageTemplate";
import UserVideoPromotion from "components/atoms/Videos/UserVideoPromotion";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import DanUpTemplate from "components/templates/DanUpTemplate";
import axiosInstance from "utils/API";
import { userInfo } from "recoils";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";

function PromotionStage() {
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [info, setInfo] = useState(undefined);
  const [curNum, setCurNum] = useState(0);
  const [prevAvg, setPrevAvg] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const [isDanUp, setIsDanUp] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [curMotion, setCurMotion] = useState("동작");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const state = useLocation().state;
  const userId = useRecoilValue(userInfo);

  let tempGrade = 0;

  const getAnswerData = async () => {
    const data = await axiosInstance.get(`/api/judge`, {});
    console.log(data);
    data.randomPoomsaeTime = 30;
    data.essentialPoomsaeTime = 30;
    data.randomPoomsaeId = 1;
    data.randomAnswer = [["abaya"], []];
    data.essentialAnswer = [["abaya"]];
    t("language") === "KOR"
      ? setCurMotion(data.randomPoomsaeExplain[0])
      : setCurMotion(data.randomPoomsaeExplainE[0]);
    setInfo(data);
  };

  useEffect(() => {
    getAnswerData();
  }, []);

  const updateIsPass = async () => {
    await axiosInstance.post(`/api/judge`, {
      user_id: userId,
      level_id: info.judgeLevelId,
      fail: gradeNum === 0 ? "0" : "1",
      judge_score: gradeNum,
    });

    setIsStar(true);
    setIsPass(true);
    if (tempGrade > 0) {
      setIsDanUp(true);
      setTimeout(() => {
        setIsStar(false);
      }, 3000);
    }
  };

  const testResult = (avg) => {
    if (curNum === 0) {
      if (avg < 0.6) {
        setGrade("Try Again");
        setGradeNum(0);
        updateIsPass();
        return;
      }
      setPrevAvg(() => avg);
      setCurNum((current) => ++current); //다음 품새
    } else if (curNum === 1) {
      avg += prevAvg;
      avg /= 2;
      if (avg >= 0.8) {
        setGrade("Perfect!");
        setGradeNum(3);
        tempGrade = 3;
      } else if (avg >= 0.7) {
        setGrade("Great");
        setGradeNum(2);
        tempGrade = 2;
      } else if (avg >= 0.6) {
        setGrade("Good");
        setGradeNum(1);
        tempGrade = 1;
      } else {
        setGrade("Try Again");
        setGradeNum(0);
      }
      updateIsPass();
    }
  };

  const restartFunc = () => {
    setIsPass(false);
    setCurNum(0);
  };
  const homeFunc = () => {
    navigate("/");
  };

  const startTimer = () => {
    if (!isTimer) {
      setIsTimer(true);
    }
  };

  return (
    <>
      {info && (
        <PromotionStageTemplate
          camera={
            <UserVideoPromotion
              testResult={testResult}
              isPass={isPass}
              startTimer={startTimer}
              isTimer={isTimer}
              curNum={curNum}
              info={info}
              setCurMotion={setCurMotion}
            />
          }
          level={info.judgeLevelId - 3}
          info={info}
          curNum={curNum}
          isTimer={isTimer}
          setIsTimer={setIsTimer}
          curMotion={curMotion}
        />
      )}

      {isPass ? (
        isDanUp ? (
          isStar ? (
            <EvaluationTemplate grade={grade} gradeNum={gradeNum} />
          ) : (
            <DanUpTemplate
              dan={info.judgeLevelId - 3}
              restart={<StageBtn onClick={restartFunc}>다시하기</StageBtn>}
              home={
                <StageBtn onClick={homeFunc} isHome>
                  홈으로 이동
                </StageBtn>
              }
            />
          )
        ) : (
          <EvaluationTemplate
            grade={grade}
            gradeNum={gradeNum}
            restart={<StageBtn onClick={restartFunc}>다시하기</StageBtn>}
            home={
              <StageBtn onClick={homeFunc} isHome>
                홈으로 이동
              </StageBtn>
            }
          />
        )
      ) : null}
    </>
  );
}

export default PromotionStage;
