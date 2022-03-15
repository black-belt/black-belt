import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import { useNavigate } from "react-router-dom";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import UserVideoCombo from "components/atoms/Videos/UserVideoCombo";
import DescStage from "components/atoms/Texts/DescStage";
import StageBtn from "components/atoms/Buttons/stage-btn";

function ComboStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [answerIndex, setAnswerIndex] = useState([]);
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [nextAction, setNextAction] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description[], 비디오(Streaming이나 youtube link), 답안[], 답안의 인덱스[] 받음
    //보내기: 서버로 통과 단계를 보냄
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setTitle("연결동작");
        setDesc([
          "왼 아래(내려)막기",
          "오른 (몸통)지르기",
          "오른 아래(내려)막기",
          "왼 (몸통)지르기",
          "왼 아래(내려)막기",
          "오른 (몸통)지르기",
          // "왼 손날 아래(내려)막기",
          // "오른 아금손 앞치기",
          // "오른 앞차기",
          // "오른 손날 아래(내려)막기",
          // "왼 아금손 앞치기",
          // "왼 앞차기",
          // "왼 손날 아래(내려)막기",
          // "오른 아금손 앞치기",
          // "오른 앞차기",
          // "왼 (무릎)눌러꺾기",
          // "안팔목 (몸통)헤쳐막기",
          // "왼 앞차기",
          // "오른 (무릎)눌러꺾기",
          // "안팔목 (몸통)헤쳐막기",
        ]);
        setAnswer(["ski mask", "coffee mug", "ski mask"]);
        setAnswerIndex([0, 2, 4]);
        setVideoSelected(`https://youtu.be/o9JvP-A4TvY`);
      });
  }, []);

  const updateIsPass = () => {
    fetch("https://jsonplaceholder.typicode.com/posts") //통과단계보냄
      .then((res) => res.json())
      .then((json) => {
        setNextAction(answer.length - 1);
        setIsPass(true);
      });
  };

  const updateNextAction = (value) => {
    setNextAction(value);
  };

  const testResult = (result) => {
    updateIsPass();
    result /= answer.length;
    if (result >= 0.8) {
      setGrade("Perfect!");
      setGradeNum(3);
    } else if (result >= 0.7) {
      setGrade("Great");
      setGradeNum(2);
    } else if (result >= 0.6) {
      setGrade("Good");
      setGradeNum(1);
    } else {
      setGrade("Try Again");
      setGradeNum(0);
    }
  };

  const restartFunc = () => {
    setNextAction(0);
    setIsPass(false);
  };
  const homeFunc = () => {
    navigate("/");
  };
  return (
    <>
      <PracticeStageTemplate
        title={title}
        desc={<DescStage descArray={desc} curIdx={answerIndex[nextAction]} />}
        video={<LocalVideo url={videoSelected} />}
        camera={
          <UserVideoCombo
            answer={answer}
            testResult={testResult}
            updateNextAction={updateNextAction}
            isPass={isPass}
          />
        }
      />

      {isPass ? (
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
      ) : null}
    </>
  );
}

export default ComboStage;
