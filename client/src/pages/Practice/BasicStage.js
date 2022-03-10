import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { Suspense, useEffect, useState, useRef } from "react";
import LocalVideo from "../../components/atoms/LocalVideo";
import UserVideo from "../../components/atoms/UserVideo";

function BasicStage() {
  const [videoSelected, setVideoSelected] = useState("../../videos/basics1.MP4");
  const videos = [
    "../../videos/basics1.MP4",
    "../../videos/basics2.MP4",
    "../../videos/basics3.MP4",
    "../../videos/basics4.MP4",
    "../../videos/basics5.MP4",
    "../../videos/basics6.MP4",
    "../../videos/basics7.MP4",
    "../../videos/basics8.MP4",
    "../../videos/basics9.MP4",
    "../../videos/basics10.MP4",
    "../../videos/basics11.MP4",
    "../../videos/basics12.MP4",
    "../../videos/basics13.MP4",
  ];

  useEffect(() => {
    //api 통신해서 title, description, 몇번째 basic인지, sessionToken받아옴
    setVideoSelected(videos[3]);
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
