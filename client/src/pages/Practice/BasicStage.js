import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import UserVideo from "../../components/atoms/Videos/UserVideo";
import { useNavigate } from "react-router-dom";
import EvaluationTemplate from "components/templates/EvaluationTemplate";

function BasicStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description, 비디오(Streaming이나 youtube link), 답안 받음
    //보내기: 서버로 통과 단계를 보냄
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        setTitle("기본동작");
        setDesc("동작설명");
        setAnswer("chickadee");
        setVideoSelected(`https://youtu.be/o9JvP-A4TvY`);
      });

    return () => {
      fetch("https://jsonplaceholder.typicode.com/posts");
    };
  }, []);

  const updateIsPass = () => {
    setIsPass(true);
    // setTimeout(() => navigate("/"), 3000);
  };

  const testResult = (result) => {
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

  return (
    <>
      <PracticeStageTemplate
        title={title}
        desc={desc}
        video={<LocalVideo url={videoSelected} />}
        camera={<UserVideo answer={answer} updateIsPass={updateIsPass} testResult={testResult} />}
      />

      {isPass ? <EvaluationTemplate grade={grade} gradeNum={gradeNum} /> : null}
    </>
  );
}

export default BasicStage;
