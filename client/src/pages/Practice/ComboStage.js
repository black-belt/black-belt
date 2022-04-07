import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import { useLocation, useNavigate } from "react-router-dom";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import UserVideoCombo from "components/atoms/Videos/UserVideoCombo";
import DescStage from "components/atoms/Texts/DescStage";
import StageBtn from "components/atoms/Buttons/stage-btn";
import axiosInstance from "utils/API";
import { useTranslation } from "react-i18next";

function ComboStage() {
  const [info, setInfo] = useState();
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [nextAction, setNextAction] = useState(0);
  const state = useLocation().state;
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description[], 비디오(Streaming이나 youtube link), 답안[], 답안의 인덱스[] 받음
    //보내기: 서버로 통과 단계를 보냄
    getComboData();
  }, []);

  const getComboData = async () => {
    const data = await axiosInstance.get(`/api/combo/${state.stageId}`, {});
    console.log(data);
    setInfo(data);
  };

  const updateIsPass = async (g) => {
    await axiosInstance.patch(`/api/combo/${state.stageId}`, {
      comboScore: g,
      comboClear: g > 0 ? "Y" : "N",
    });
    setNextAction(info.combo_answer.length - 1);
    setIsPass(true);
  };

  const updateNextAction = (value) => {
    setNextAction(value);
  };

  const testResult = (result) => {
    let g = 0;
    result /= info.combo_answer.length;
    if (result >= 0.8) {
      setGrade("Perfect!");
      setGradeNum(3);
      g = 3;
    } else if (result >= 0.7) {
      setGrade("Great");
      setGradeNum(2);
      g = 2;
    } else if (result >= 0.6) {
      setGrade("Good");
      setGradeNum(1);
      g = 1;
    } else {
      setGrade("Try Again");
      setGradeNum(0);
    }
    updateIsPass(g);
  };

  const restartFunc = () => {
    setNextAction(0);
    setIsPass(false);
  };
  const homeFunc = () => {
    navigate("/combos");
  };
  return (
    <>
      {info && (
        <PracticeStageTemplate
          title={t("language") === "KOR" ? info.combo_name : info.combo_name_e}
          desc={
            <DescStage
              descArray={t("language") === "KOR" ? info.combo_explain : info.combo_explain_e}
              curIdx={info.combo_answer_index[nextAction]}
            />
          }
          video={<LocalVideo url={info.combo_movie_path} />}
          camera={
            <UserVideoCombo
              aiId={state.stageId}
              answer={info.combo_answer}
              testResult={testResult}
              updateNextAction={updateNextAction}
              isPass={isPass}
            />
          }
        />
      )}

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
