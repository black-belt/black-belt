import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StageBtn from "components/atoms/Buttons/stage-btn";
import PromotionStageTemplate from "components/templates/PromotionStageTemplate";
import UserVideoPromotion from "components/atoms/Videos/UserVideoPromotion";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import DanUpTemplate from "components/templates/DanUpTemplate";

function PromotionStage() {
  const [title, setTitle] = useState("");
  const [dan, setDan] = useState(0);
  const [answerRandom, setAnswerRandom] = useState([]);
  const [answerMapRandom, setAnswerMapRandom] = useState(new Map());
  const [answerEssential, setAnswerEssential] = useState([]);
  const [answerMapEssential, setAnswerMapEssential] = useState(new Map());
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [info, setInfo] = useState([[]]);
  const [curNum, setCurNum] = useState(0);
  const [prevAvg, setPrevAvg] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [initialSeconds, setinitialSeconds] = useState(0);
  const [initialProgress, setinitialProgress] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const [isDanUp, setIsDanUp] = useState(false);
  const [readyAction, setReadyAction] = useState();
  const [isStar, setIsStar] = useState(false);
  const videoText = "시작하려면 ‘기본준비자세’를 취해주세요.";
  const navigate = useNavigate();
  let tempGrade = 0;

  useEffect(() => {
    //받기: api 통신해서 title, 답안[] 받음
    //보내기: 서버로 통과 단계를 보냄
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setTitle("1단");
        setDan(1);
        setAnswerRandom(["abaya"]); //, "coffee mug", "abaya", "coffee mug"
        ["abaya", "coffee mug", "abaya", "coffee mug"].forEach((key, index) => {
          if (answerMapRandom.has(key)) {
            setAnswerMapRandom((current) =>
              new Map(current).set(key, [...current.get[key], index])
            );
          } else {
            setAnswerMapRandom((current) => new Map([...current, [key, index]]));
          }
        });

        setAnswerEssential(["abaya"]);
        ["abaya"].forEach((key, index) => {
          if (answerMapEssential.has(key)) {
            setAnswerMapEssential((current) =>
              new Map(current).set(key, [...current.get[key], index])
            );
          } else {
            setAnswerMapEssential((current) => new Map([...current, [key, index]]));
          }
        });
        setInfo([
          ["지정품새", "3장"],
          ["필수품새", "8장"],
        ]);
        setReadyAction("abaya");
        setCurNum(0);
        setTotalSeconds(10);
      });
  }, []);

  const updateIsPass = () => {
    fetch("https://jsonplaceholder.typicode.com/posts") //통과단계보냄
      .then((res) => res.json())
      .then((json) => {
        // setNextAction(answer[3].length - 1);
        // setPartIndex(3);
        setIsStar(true);
        setIsPass(true);
        if (tempGrade > 0) {
          setIsDanUp(true);
          setTimeout(() => {
            setIsStar(false);
          }, 3000);
        }
      });
  };

  const testResult = (result) => {
    if (curNum === 0) {
      result /= answerRandom.length;
      if (result < 0.6) {
        setGrade("Try Again");
        setGradeNum(0);
        updateIsPass();
        return;
      }
      setPrevAvg(() => result);
      setCurNum((current) => ++current); //다음 품새
    } else if (curNum === 1) {
      result /= answerEssential.length;
      result += prevAvg;
      result /= 2;
      if (result >= 0.8) {
        setGrade("Perfect!");
        setGradeNum(3);
        tempGrade = 3;
      } else if (result >= 0.7) {
        setGrade("Great");
        setGradeNum(2);
        tempGrade = 2;
      } else if (result >= 0.6) {
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
    // setNextAction(0);
    // setPartIndex(0);
    // setIsPassArray([false, false, false, false]);
    setIsPass(false);
    setCurNum(0);
    setinitialSeconds(0);
    setinitialProgress(0);
  };
  const homeFunc = () => {
    navigate("/");
  };

  const startTimer = () => {
    // console.log("!!startTimer");
    if (!isTimer) {
      // console.log("!!startTimer 들옴");
      setinitialSeconds(0);
      setinitialProgress(0);
      setIsTimer(true);
    }
  };

  return (
    <>
      {readyAction && (
        <PromotionStageTemplate
          title={title}
          camera={
            <UserVideoPromotion
              answerRandom={answerRandom}
              answerMapRandom={answerMapRandom}
              answerEssential={answerEssential}
              answerMapEssential={answerMapEssential}
              testResult={testResult}
              // updateNextAction={updateNextAction}
              // updatePartIndex={updatePartIndex}
              isPass={isPass}
              startTimer={startTimer}
              isTimer={isTimer}
              readyAction={readyAction}
              totalSeconds={totalSeconds}
              curNum={curNum}
            />
          }
          info={info}
          curNum={curNum}
          totalSeconds={totalSeconds}
          initialSeconds={initialSeconds}
          initialProgress={initialProgress}
          videoText={videoText}
          isTimer={isTimer}
          setIsTimer={setIsTimer}
        />
      )}

      {isPass ? (
        isDanUp ? (
          isStar ? (
            <EvaluationTemplate grade={grade} gradeNum={gradeNum} />
          ) : (
            <DanUpTemplate
              dan={dan}
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
