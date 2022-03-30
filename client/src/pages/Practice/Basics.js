import BasicCard from "components/molecules/BasicCard";
import BasicTemplate from "components/templates/BasicTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/API";

function Basics() {
  const { t } = useTranslation();
  const [cardInfoList, setCardInfoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBasicData();
  }, []);

  const getBasicData = async () => {
    const data = await axiosInstance.get("/api/basic", {});
    setCardInfoList(() => data);
  };

  const goToStage = (stageId) => {
    navigate(`/practice/basics/stage`, { state: { stageId: stageId } });
  };

  return (
    <>
      {cardInfoList.length > 0 && (
        <BasicTemplate
          cards={cardInfoList.map((value, index) => {
            return (
              <BasicCard
                onClick={goToStage}
                key={index}
                stageId={value.basic_id}
                title={
                  t("language") === "KOR"
                    ? value.basic_name
                    : value.basic_name_e
                }
                desc={
                  t("language") === "KOR"
                    ? value.basic_explain
                    : value.basic_explain_e
                }
                img="/images/card2.png"
                clear={value.basic_clear}
                score={value.basic_score}
                locked={value.basic_locked}
              />
            );
          })}
        />
      )}
    </>
  );
}

export default Basics;
