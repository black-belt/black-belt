import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import UserVideo from "../../components/atoms/Videos/UserVideo";
import { useNavigate } from "react-router-dom";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import StageBtn from "components/atoms/Buttons/stage-btn";
import LevelUpTemplate from "components/templates/LevelUpTemplate";

function BasicStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [level, setLevel] = useState("white belt");
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description, 비디오(Streaming이나 youtube link), 답안 받음
    //보내기: 서버로 통과 단계를 보냄
    //받기: 레벨업했는지, 했으면 얻은레벨
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setTitle("기본동작");
        setDesc("동작설명");
        setAnswer("mask");
        setVideoSelected(`https://youtu.be/o9JvP-A4TvY`);
      });
  }, []);

  const updateIsPass = () => {
    fetch("https://jsonplaceholder.typicode.com/posts") //통과여부 서버로 보내줌
      .then(
        fetch("https://jsonplaceholder.typicode.com/posts") //레벨업했는지, 했으면 얻은레벨
          .then((res) => res.json())
          .then((json) => {
            let jsonIsLevelUp = true; //레벨업했는지 안했는지
            let jsonLevel = "yellow belt";
            if (jsonIsLevelUp) {
              setIsLevelUp(jsonIsLevelUp);
              setLevel(jsonLevel);
              setTimeout(() => {
                setIsLevelUp(!jsonIsLevelUp);
              }, 3000);
            }
            setIsPass(true);
          })
      );
  };

  const testResult = (result) => {
    updateIsPass();
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
    setIsLevelUp(false);
    setIsPass(false);
  };
  const homeFunc = () => {
    navigate("/");
  };

  return (
    <>
      <PracticeStageTemplate
        title={title}
        desc={desc}
        video={<LocalVideo url={videoSelected} />}
        camera={<UserVideo answer={answer} testResult={testResult} isPass={isPass} />}
      />

      {isPass ? (
        isLevelUp ? (
          <LevelUpTemplate level={level} />
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

export default BasicStage;
