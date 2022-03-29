import PoomsaeTemplate from "components/templates/PoomsaeTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Poomsae() {
  const { t } = useTranslation();
  const [poomsaeList, setPoomsaeList] = useState([]);
  const [selectedPoomsaeIdx, setSelectedPoomsaeIdx] = useState(0);
  const [selectedPoomsaeInfo, setSelectedPoomsaeInfo] = useState([]);
  const [imageNum, setImageNum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 연결동작의 목록들을 받음
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let jsonInfo = [
          {
            poomsaeId: 1,
            poomsaeName: "품새이름1",
            poomsaeNameE: "poomsae_name_e1",
            poomsaeExplain: "poomsae_explain1",
            poomsaeExplainE: "poomsae_explain_e1",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: true,
            poomsaeScore: 3,
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 2,
            poomsaeName: "품새이름2",
            poomsaeNameE: "poomsae_name_e2",
            poomsaeExplain: "poomsae_explain2",
            poomsaeExplainE: "poomsae_explain_e2",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: false,
            poomsaeScore: 2,
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 3,
            poomsaeName: "품새이름3",
            poomsaeNameE: "poomsae_name_e3",
            poomsaeExplain: "poomsae_explain3",
            poomsaeExplainE: "poomsae_explain_e3",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 4,
            poomsaeName: "품새이름4",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 5,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 6,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 7,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 8,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 9,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 10,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 11,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 12,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 13,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 14,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 15,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
          {
            poomsaeId: 16,
            poomsaeName: "poomsae_name",
            poomsaeNameE: "poomsae_name_e",
            poomsaeExplain: "poomsae_explain",
            poomsaeExplainE: "poomsae_explain_e",
            poomsaeImgPath: "poomsae_img_path ",
            poomsaeClear: "poomsae_clear",
            poomsaeScore: "poomsae_score",
            poomsaeLocked: "poomsae_locked",
          },
        ];
        setPoomsaeList(jsonInfo);
        setSelectedPoomsaeInfo(jsonInfo[0]);
        setImageNum(1);
      });
  }, []);

  const goToStage = () => {
    navigate(`/practice/poomsae/stage`, {
      state: { stageId: selectedPoomsaeInfo.poomsaeId },
    });
  };

  const makeRandom = () => {
    // return Math.floor(Math.random() * 16) + 1;
    return selectedPoomsaeIdx + 1;
  };

  const changePoomsae = (index) => {
    setSelectedPoomsaeIdx(index);
    setSelectedPoomsaeInfo(() => poomsaeList[index]);
    setImageNum(index + 1);
  };

  // const changeChapter = (index) => {
  //   setSelectedChapterIdx(index);
  // };

  return (
    <PoomsaeTemplate
      buttons={
        t("language") === "KOR"
          ? poomsaeList.map((value) => value.poomsaeName)
          : poomsaeList.map((value) => value.poomsaeNameE)
      }
      selectedPoomsaeIdx={selectedPoomsaeIdx}
      selectedPoomsaeInfo={selectedPoomsaeInfo}
      changePoomsae={changePoomsae}
      goToStage={goToStage}
      imageNum={imageNum}
    />
  );
}

export default Poomsae;
