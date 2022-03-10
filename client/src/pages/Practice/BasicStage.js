import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/LocalVideo";
import UserVideo from "../../components/atoms/UserVideo";

function BasicStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");

  useEffect(() => {
    //받기: api 통신해서 title, description, 몇번째 basic인지, sessionToken받아옴
    //할일: 24?30?60? 프레임으로 사진캡쳐해서 AI모델에 비교
    //보내기: api통신해서 3초마다 AI모델에서 나온 결과값을 송신?
    //  여기서 또받아? 합격/불합격여부를?
    //  기본동작에서는 합격/불합격을 프론트에서 판단가능할듯 -> 서버로 합격/불합격을 보내면 될거같은데
    const basicNumber = 3;
    setVideoSelected(`../../videos/basics${basicNumber}.MP4`);
  }, []);

  return (
    <PracticeStageTemplate
      title={<h1>Title</h1>}
      desc={<div>description</div>}
      video={<LocalVideo url={videoSelected} />}
      camera={<UserVideo />}
    />
  );
}

export default BasicStage;
