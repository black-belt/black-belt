import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/LocalVideo";
import UserVideo from "../../components/atoms/UserVideo";
import { useNavigate } from "react-router-dom";

function BasicStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [basicNumber, setBasicNumber] = useState(1);
  const [isPass, setIsPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description, 몇번째 basic인지받음
    // 비디오 자체를 받을지도
    //할일: 24?30?60? 프레임으로 사진캡쳐해서 AI모델에 비교
    //보내기: 서버로 합격/불합격을 보냄
    setBasicNumber(5);
    setTitle("기본동작");
    setDesc("동작설명");
    setVideoSelected(`../../videos/basics${basicNumber}.MP4`);
  }, [basicNumber]);

  const updateIsPass = () => {
    setIsPass(true);
    // console.log("통과!", isPass);
    navigate("/");
  };

  return (
    <PracticeStageTemplate
      title={title}
      desc={desc}
      video={<LocalVideo url={videoSelected} />}
      camera={<UserVideo basicNumber={"goldfinch"} updateIsPass={updateIsPass} isPass={isPass} />}
    />
    // <>
    //   {isPass ? null : (
    //     <PracticeStageTemplate
    //       title={title}
    //       desc={desc}
    //       video={<LocalVideo url={videoSelected} />}
    //       camera={<UserVideo basicNumber={"bee eater"} setIsPass={setIsPass} />}
    //     />
    //   )}
    // </>
  );
}

export default BasicStage;
