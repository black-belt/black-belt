import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StageBtn from "components/atoms/Buttons/stage-btn";
import EvaluationTemplatePoomsae from "components/templates/EvaluationTemplatePoomsae";
import PromotionStageTemplate from "components/templates/PromotionStageTemplate";
import UserVideoPromotion from "components/atoms/Videos/UserVideoPromotion";

function PromotionStage() {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState([]);
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [nextAction, setNextAction] = useState(0);
  const [partIndex, setPartIndex] = useState(0);
  const [isPassArray, setIsPassArray] = useState([false, false, false, false]);
  const [info, setInfo] = useState([[]]);
  const [curNum, setCurNum] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [initialSeconds, setinitialSeconds] = useState(0);
  const [initialProgress, setinitialProgress] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const resultArray = [0, 0, 0, 0];
  const videoText = "시작하려면 ‘기본준비자세’를 취해주세요.";
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, 답안[] 받음
    //보내기: 서버로 통과 단계를 보냄
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setTitle("1단");
        setAnswer(["mask", "water jug", "mask"]);
        setInfo([
          ["지정품새", "3장"],
          ["필수품새", "8장"],
        ]);
        setCurNum(0);
        setTotalSeconds(3);
      });
  }, []);

  const updateIsPass = () => {
    fetch("https://jsonplaceholder.typicode.com/posts") //통과단계보냄
      .then((res) => res.json())
      .then((json) => {
        setNextAction(answer[3].length - 1);
        setPartIndex(3);
        setIsPass(true);
      });
  };

  const updateNextAction = (value) => {
    setNextAction(value);
  };

  const updatePartIndex = (value) => {
    setPartIndex(value);
  };

  const testResult = (index, result) => {
    resultArray[index] = result / answer[index].length;
    // console.log("!!평균", resultArray[index]);
    if (resultArray[index] >= 0.6)
      setIsPassArray((current) => {
        current[index] = true;
        return current;
      });
    // console.log("!!결과", index, resultArray[index], isPassArray[index]);
    if (index === 3) {
      updateIsPass();
      let sum = 0;
      let pass = true;
      isPassArray.forEach((value) => {
        if (!value) pass = false;
      });
      if (!pass) {
        setGrade("Try Again");
        setGradeNum(0);
        return;
      }
      resultArray.forEach((value) => (sum += value));
      sum /= 4;
      if (sum >= 0.8) {
        setGrade("Perfect!");
        setGradeNum(3);
      } else if (sum >= 0.7) {
        setGrade("Great");
        setGradeNum(2);
      } else if (sum >= 0.6) {
        setGrade("Good");
        setGradeNum(1);
      } else {
        setGrade("Try Again");
        setGradeNum(0);
      }
    }
  };

  const restartFunc = () => {
    setNextAction(0);
    setPartIndex(0);
    setIsPassArray([false, false, false, false]);
    setIsPass(false);
  };
  const homeFunc = () => {
    navigate("/");
  };

  const startTimer = () => {
    setinitialSeconds(0);
    setinitialProgress(0);
    setIsTimer(true);
  };
  const setd = () => {
    startTimer();
    setCurNum((current) => ++current);
  };
  return (
    <>
      <PromotionStageTemplate
        title={title}
        camera={
          <UserVideoPromotion
            answer={answer}
            testResult={testResult}
            updateNextAction={updateNextAction}
            updatePartIndex={updatePartIndex}
            isPass={isPass}
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

      {isPass ? (
        <EvaluationTemplatePoomsae
          grade={grade}
          gradeNum={gradeNum}
          restart={<StageBtn onClick={restartFunc}>다시하기</StageBtn>}
          home={
            <StageBtn onClick={homeFunc} isHome>
              홈으로 이동
            </StageBtn>
          }
          isPassArray={isPassArray}
        />
      ) : null}

      <button onClick={setd}>qjxms</button>
    </>
  );
}

export default PromotionStage;
