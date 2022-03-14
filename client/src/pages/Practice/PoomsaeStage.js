import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import { useNavigate } from "react-router-dom";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import DescStage from "components/atoms/Texts/DescStage";
import StageBtn from "components/atoms/Buttons/stage-btn";
import UserVideoPoomsae from "components/atoms/Videos/UserVideoPoomsae";
import PartStage from "components/atoms/Texts/PartStage";

function PoomsaeStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState([[]]);
  const [answerOrigin, setAnswerOrigin] = useState([[]]);
  const [answer, setAnswer] = useState([[]]);
  const [answerIndex, setAnswerIndex] = useState([[]]);
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [nextAction, setNextAction] = useState(0);
  const [part, setPart] = useState(["1단락", "2단락", "3단락", "4단락"]); //영어버전
  const [partIndex, setPartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description[[]], 비디오(Streaming이나 youtube link), 답안[[]], 답안의 인덱스[[]] 받음
    //보내기: 서버로 통과 단계를 보냄
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setTitle("품새");
        setDesc([
          [
            "왼 아래(내려)막기",
            "오른 (몸통)지르기",
            "오른 아래(내려)막기",
            "왼 (몸통)지르기",
            "왼 아래(내려)막기",
            "오른 (몸통)지르기",
          ],
          [
            "2왼 아래(내려)막기",
            "2오른 (몸통)지르기",
            "2오른 아래(내려)막기",
            "2왼 (몸통)지르기",
            "2왼 아래(내려)막기",
            "2오른 (몸통)지르기",
          ],
          [
            "3왼 아래(내려)막기",
            "3오른 (몸통)지르기",
            "3오른 아래(내려)막기",
            "3왼 (몸통)지르기",
            "3왼 아래(내려)막기",
            "3오른 (몸통)지르기",
          ],
          [
            "4왼 아래(내려)막기",
            "4오른 (몸통)지르기",
            "4오른 아래(내려)막기",
            "4왼 (몸통)지르기",
            "4왼 아래(내려)막기",
            "4오른 (몸통)지르기",
          ],
        ]);
        setAnswerOrigin([
          ["coffee mug", "coffee mug", "coffee mug"],
          ["coffee mug", "coffee mug", "coffee mug"],
          ["coffee mug", "coffee mug", "coffee mug"],
          ["coffee mug", "coffee mug", "coffee mug"],
        ]);
        setAnswer([
          ["coffee mug", "coffee mug", "coffee mug"],
          ["coffee mug", "coffee mug", "coffee mug"],
          ["coffee mug", "coffee mug", "coffee mug"],
          ["coffee mug", "coffee mug", "coffee mug"],
        ]);
        setAnswerIndex([
          [0, 2, 4, 5],
          [0, 2, 4, 5],
          [0, 2, 4, 5],
          [0, 2, 4, 5],
        ]);
        setVideoSelected(`https://youtu.be/o9JvP-A4TvY`);
      });

    return () => {
      fetch("https://jsonplaceholder.typicode.com/posts");
    };
  }, []);

  const updateIsPass = () => {
    setNextAction(0);
    setPartIndex(0);
    // setAnswer([[]]);
    setIsPass(true);
  };

  const testResult = (result) => {
    let num = 0;
    answer.forEach((ans) => {
      num += ans.length;
    });
    result /= num;
    if (result >= 0.8) {
      setGrade("Perfect!");
      setGradeNum(3);
    } else if (result >= 0.7) {
      setGrade("Great");
      setGradeNum(2);
    } else if (result >= 0.6) {
      setGrade("Good");
      setGradeNum(1);
    }
  };

  // const updatePartIndex = (props) => {
  //   if (props === 1) setPartIndex((current) => current + 1);
  //   else setPartIndex(0);
  // };

  const restartFunc = () => {
    setIsPass(false);
    setAnswer(answerOrigin);
  };
  const homeFunc = () => {
    navigate("/");
  };

  // console.log(
  //   "part",
  //   partIndex,
  //   "nextAc",
  //   nextAction,
  //   "answerIndex",
  //   answerIndex
  //   // "value",
  //   // answerIndex[partIndex][nextAction]
  // );

  return (
    <>
      <PracticeStageTemplate
        title={title}
        partStage={<PartStage partArray={part} curIdx={partIndex} />}
        desc={<DescStage descArray={desc[partIndex]} curIdx={answerIndex[partIndex][nextAction]} />}
        video={<LocalVideo url={videoSelected} />}
        camera={
          <UserVideoPoomsae
            answer={answer[partIndex]}
            updateIsPass={updateIsPass}
            testResult={testResult}
            setNextAction={setNextAction}
            setPartIndex={setPartIndex}
            partIndex={partIndex}
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

export default PoomsaeStage;
