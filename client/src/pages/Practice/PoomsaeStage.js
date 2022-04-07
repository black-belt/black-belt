import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import { useLocation, useNavigate } from "react-router-dom";
import DescStage from "components/atoms/Texts/DescStage";
import StageBtn from "components/atoms/Buttons/stage-btn";
import UserVideoPoomsae from "components/atoms/Videos/UserVideoPoomsae";
import PartStage from "components/atoms/Texts/PartStage";
import EvaluationTemplatePoomsae from "components/templates/EvaluationTemplatePoomsae";
import axiosInstance from "utils/API";
import { useTranslation } from "react-i18next";

function PoomsaeStage() {
  const [info, setInfo] = useState();
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [nextAction, setNextAction] = useState(0);
  const [partIndex, setPartIndex] = useState(0);
  const [isPassArray, setIsPassArray] = useState([false, false, false, false]);
  const state = useLocation().state;
  const resultArray = [0, 0, 0, 0];
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description[[]], 비디오(Streaming이나 youtube link), 답안[[]], 답안의 인덱스[[]] 받음
    //보내기: 서버로 통과 단계를 보냄
    getPoomsaeData();
  }, []);

  const getPoomsaeData = async () => {
    const data = await axiosInstance.get(`/api/poomsae/${state.stageId}`, {});
    console.log(data);
    // data.poomsae_answer = [
    //   ["abaya", "coffee mug", "abaya"],
    //   ["abaya", "coffee mug", "abaya"],
    //   ["abaya", "coffee mug", "abaya"],
    //   ["abaya", "coffee mug", "abaya"],
    // ];
    // data.poomsae_movie_path = "https://youtu.be/o9JvP-A4TvY";
    // data.poomsae_answer_index = [
    //   [0, 2, 4],
    //   [1, 3, 5],
    //   [0, 2, 4],
    //   [1, 3, 5],
    // ];
    data.poomsae_part = ["1단락", "2단락", "3단락", "4단락"];
    data.poomsae_part_e = ["Part1", "Part2", "Part3", "Part4"];
    setInfo(data);
  };

  const updateIsPass = async (g) => {
    await axiosInstance.patch(`/api/poomsae/${state.stageId}`, {
      poomsaeScore: g,
      poomsaeClear: g > 0 ? "Y" : "N",
    });
    setNextAction(info.poomsae_answer[3].length - 1);
    setPartIndex(3);
    setIsPass(true);
  };

  const updateNextAction = (value) => {
    setNextAction(value);
  };

  const updatePartIndex = (value) => {
    setPartIndex(value);
  };

  const testResult = (index, result) => {
    resultArray[index] = result / info.poomsae_answer[index].length;
    // console.log("!!평균", resultArray[index]);
    if (resultArray[index] >= 0.6)
      setIsPassArray((current) => {
        current[index] = true;
        return current;
      });
    // console.log("!!결과", index, resultArray[index], isPassArray[index]);
    if (index === 3) {
      let g = 0;
      let sum = 0;
      let pass = true;
      resultArray.forEach((value) => (sum += value));
      isPassArray.forEach((value) => {
        if (!value) pass = false;
      });
      if (!pass) {
        setGrade("Try Again");
        setGradeNum(0);
        updateIsPass(g);
        return;
      }
      sum /= 4;
      if (sum >= 0.8) {
        setGrade("Perfect!");
        setGradeNum(3);
        g = 3;
      } else if (sum >= 0.7) {
        setGrade("Great");
        setGradeNum(2);
        g = 2;
      } else if (sum >= 0.6) {
        setGrade("Good");
        setGradeNum(1);
        g = 1;
      } else {
        setGrade("Try Again");
        setGradeNum(0);
      }
      updateIsPass(g);
    }
  };

  const restartFunc = () => {
    setNextAction(0);
    setPartIndex(0);
    setIsPassArray([false, false, false, false]);
    setIsPass(false);
  };
  const homeFunc = () => {
    navigate("/poomsae");
  };

  return (
    <>
      {info && (
        <PracticeStageTemplate
          title={t("language") === "KOR" ? info.poomsae_name : info.poomsae_name_e}
          partStage={
            <PartStage
              partArray={t("language") === "KOR" ? info.poomsae_part : info.poomsae_part_e}
              curIdx={partIndex}
            />
          }
          desc={
            <DescStage
              descArray={
                t("language") === "KOR"
                  ? info.poomsae_explain[partIndex]
                  : info.poomsae_explain_e[partIndex]
              }
              curIdx={info.poomsae_answer_index[partIndex][nextAction]}
            />
          }
          video={<LocalVideo url={info.poomsae_movie_path} />}
          camera={
            <UserVideoPoomsae
              answer={info.poomsae_answer}
              testResult={testResult}
              updateNextAction={updateNextAction}
              updatePartIndex={updatePartIndex}
              isPass={isPass}
              poomsaeId={state.stageId}
            />
          }
        />
      )}

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
    </>
  );
}

export default PoomsaeStage;
