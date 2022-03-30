import PoomsaeTemplate from "components/templates/PoomsaeTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";

function Poomsae() {
  const { t } = useTranslation();
  const [poomsaeList, setPoomsaeList] = useState([]);
  const [selectedPoomsaeIdx, setSelectedPoomsaeIdx] = useState(0);
  const [selectedPoomsaeInfo, setSelectedPoomsaeInfo] = useState([]);
  const [imageNum, setImageNum] = useState(0);
  const navigate = useNavigate();

  const getPoomsaeData = async () => {
    const data = await axiosInstance.get("/api/poomsae", {});
    console.log(data);
    setPoomsaeList(() => data);
    setSelectedPoomsaeInfo(data[0]);
    setImageNum(1);
  };

  useEffect(() => {
    //받기: api 통신해서 연결동작의 목록들을 받음
    getPoomsaeData();
  }, []);

  const goToStage = () => {
    navigate(`/practice/poomsae/stage`, {
      state: { stageId: selectedPoomsaeInfo.poomsae_id },
    });
  };

  const changePoomsae = (index) => {
    setSelectedPoomsaeIdx(index);
    setSelectedPoomsaeInfo(() => poomsaeList[index]);
    setImageNum(index + 1);
  };

  return (
    <PoomsaeTemplate
      buttons={
        t("language") === "KOR"
          ? poomsaeList.map((value) => value.poomsae_name)
          : poomsaeList.map((value) => value.poomsae_name_e)
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
