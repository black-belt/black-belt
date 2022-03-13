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
  const [basicNumber, setBasicNumber] = useState(1);
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description, 몇번째 basic인지받음
    // 비디오 자체를 받을지도
    //보내기: 서버로 합격/불합격을 보냄
    setBasicNumber(5);
    setTitle("기본동작");
    setDesc("동작설명");
    setVideoSelected(`../../videos/basics${basicNumber}.MP4`);
  }, [basicNumber]);

  const updateIsPass = () => {
    setIsPass(true);
    console.log("통과!", isPass);
    setTimeout(() => navigate("/"), 3000);
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
        camera={
          <UserVideo
            basicNumber={"chickadee"}
            updateIsPass={updateIsPass}
            testResult={testResult}
          />
        }
      />

      {isPass ? (
        <EvaluationTemplate grade={grade} gradeNum={gradeNum} visibility="visible" d="100" />
      ) : null}
    </>
  );
}

export default BasicStage;
