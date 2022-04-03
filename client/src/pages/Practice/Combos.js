import ComboTemplate from "components/templates/ComboTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";

function Combos() {
  const { t } = useTranslation();
  const [poomsaeList, setPoomsaeList] = useState([]);
  // const [poomsaeListKor, setPoomsaeListKor] = useState([]);
  // const [poomsaeListEng, setPoomsaeListEng] = useState([]);
  const [selectedPoomsaeIdx, setSelectedPoomsaeIdx] = useState(0);
  const [selectedPoomsaeInfo, setSelectedPoomsaeInfo] = useState([]);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();

  const getComboData = async () => {
    const data = await axiosInstance.get("/api/combo", {});
    // console.log(data);
    setPoomsaeList(() => data);
    setSelectedPoomsaeInfo(data[0]);
    setImageList(makeRandom());
  };

  useEffect(() => {
    //받기: api 통신해서 연결동작의 목록들을 받음
    getComboData();
  }, []);

  const goToStage = (stageId) => {
    console.log(selectedPoomsaeInfo.comboList[stageId].combo_id);
    navigate(`/practice/combos/stage`, {
      state: { stageId: selectedPoomsaeInfo.comboList[stageId].combo_id },
    });
  };

  const makeRandom = () => {
    let randomIndexArray = [];
    for (let i = 0; i < 4; i++) {
      //check if there is any duplicate index
      let randomNum = Math.floor(Math.random() * 16) + 1;
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        //if the randomNum is already in the array retry
        i--;
      }
    }
    return randomIndexArray;
  };

  const changePoomsae = (index) => {
    setSelectedPoomsaeIdx(index);
    // setSelectedPoomsaeInfo(t("language") === "KOR" ? poomsaeListKor[index] : poomsaeListEng[index]);
    setSelectedPoomsaeInfo(() => poomsaeList[index]);
    setSelectedChapterIdx(0);
    setImageList(makeRandom());
  };

  const changeChapter = (index) => {
    setSelectedChapterIdx(index);
  };

  return (
    <ComboTemplate
      buttons={
        t("language") === "KOR"
          ? poomsaeList.map((value) => value.poomsae_name)
          : poomsaeList.map((value) => value.poomsae_name_e)
      }
      selectedPoomsaeIdx={selectedPoomsaeIdx}
      selectedPoomsaeInfo={selectedPoomsaeInfo}
      changePoomsae={changePoomsae}
      selectedChapterIdx={selectedChapterIdx}
      changeChapter={changeChapter}
      goToStage={goToStage}
      imageList={imageList}
    />
  );
}

export default Combos;
