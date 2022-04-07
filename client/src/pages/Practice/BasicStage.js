import PracticeStageTemplate from "../../components/templates/PracticeStageTemplate";
import { useEffect, useState } from "react";
import LocalVideo from "../../components/atoms/Videos/LocalVideo";
import UserVideo from "../../components/atoms/Videos/UserVideo";
import { useNavigate, useLocation } from "react-router-dom";
import EvaluationTemplate from "components/templates/EvaluationTemplate";
import StageBtn from "components/atoms/Buttons/stage-btn";
import LevelUpTemplate from "components/templates/LevelUpTemplate";
import axiosInstance from "utils/API";
import { useTranslation } from "react-i18next";

function BasicStage() {
  const [info, setInfo] = useState();
  const [isPass, setIsPass] = useState(false);
  const [grade, setGrade] = useState("Try Again");
  const [gradeNum, setGradeNum] = useState(0);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [level, setLevel] = useState("white belt");
  const [isStar, setIsStar] = useState(false);
  const { t } = useTranslation();
  const state = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 title, description, 비디오(Streaming이나 youtube link), 답안 받음
    //보내기: 서버로 통과 단계를 보냄
    //받기: 레벨업했는지, 했으면 얻은레벨
    getBasicData();
    return () => {
      setIsPass(true);
    };
  }, []);

  const getBasicData = async () => {
    const data = await axiosInstance.get(`/api/basic/${state.stageId}`, {});
    console.log(data);
    setInfo(data);
  };

  const updateIsPass = async (g) => {
    const data = await axiosInstance.patch(`/api/basic/${state.stageId}`, {
      basicScore: g,
      basicClear: g > 0 ? "Y" : "N",
    });
    console.log(data);
    if (data.levelpre !== data.levelafter) {
      setIsLevelUp(true);
      setLevel(data.levelafter);
      setIsStar(true);
      setTimeout(() => {
        setIsStar((current) => !current);
      }, 3000);
    }
    setIsPass(true);
  };

  const testResult = (result) => {
    let g = 0;
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
    setIsLevelUp(false);
    setIsPass(false);
  };
  const homeFunc = () => {
    navigate("/basics");
  };

  return (
    <>
      {info && (
        <PracticeStageTemplate
          title={t("language") === "KOR" ? info.basic_name : info.basic_name_e}
          desc={t("language") === "KOR" ? info.basic_explain : info.basic_explain_e}
          video={<LocalVideo url={info.basic_movie_path} />}
          camera={
            <UserVideo
              answer={info.basic_answer}
              testResult={testResult}
              isPass={isPass}
              aiId={state.aiId}
            />
          }
        />
      )}

      {/*3초 ET가 뜨고 그뒤엔 LUT가  */}
      {isPass ? (
        isLevelUp ? (
          isStar ? (
            <EvaluationTemplate grade={grade} gradeNum={gradeNum} />
          ) : (
            <LevelUpTemplate
              level={level}
              restart={<StageBtn onClick={restartFunc}>다시하기</StageBtn>}
              home={
                <StageBtn onClick={homeFunc} isHome>
                  홈으로 이동
                </StageBtn>
              }
            />
          )
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
