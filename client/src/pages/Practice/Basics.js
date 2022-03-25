import BasicCard from "components/molecules/BasicCard";
import BasicTemplate from "components/templates/BasicTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Basics() {
  const { t, i18n } = useTranslation();
  const [cardInfoList, setCardInfoList] = useState([]);
  const [selectedStage, setSelectedStage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 기본동작의 목록들을 받음
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let jsonInfo = [
          {
            basicId: 1,
            basicName: "basic_이름",
            basicNameE: "basic_name_e",
            basicExplain: "basic_설명basic_설명basic_설명basic_설명basic_설명",
            basicExplainE: "basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: true,
            basicScore: 2,
            basicLocked: "basic_locked",
          },
          {
            basicId: 2,
            basicName: "2basic_이름",
            basicNameE: "2basic_name_e",
            basicExplain: "2basic_설명",
            basicExplainE: "2basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: false,
            basicScore: 2,
            basicLocked: "2basic_locked",
          },
          {
            basicId: 3,
            basicName: "3basic_이름",
            basicNameE: "3basic_name_e",
            basicExplain: "3basic_설명",
            basicExplainE: "3basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: true,
            basicScore: 3,
            basicLocked: "3basic_locked",
          },
          {
            basicId: 4,
            basicName: "4basic_이름",
            basicNameE: "4basic_name_e",
            basicExplain: "4basic_설명",
            basicExplainE: "4basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: false,
            basicScore: 2,
            basicLocked: "4basic_locked",
          },
          {
            basicId: 5,
            basicName: "5basic_이름",
            basicNameE: "5basic_name_e",
            basicExplain: "5basic_설명",
            basicExplainE: "5basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: true,
            basicScore: 1,
            basicLocked: "5basic_locked",
          },
          {
            basicId: 6,
            basicName: "2basic_이름",
            basicNameE: "2basic_name_e",
            basicExplain: "2basic_설명",
            basicExplainE: "2basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: false,
            basicScore: 2,
            basicLocked: "2basic_locked",
          },
          {
            basicId: 7,
            basicName: "basic_이름",
            basicNameE: "basic_name_e",
            basicExplain: "basic_설명",
            basicExplainE: "basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: true,
            basicScore: 2,
            basicLocked: "basic_locked",
          },
          {
            basicId: 8,
            basicName: "2basic_이름",
            basicNameE: "2basic_name_e",
            basicExplain: "2basic_설명",
            basicExplainE: "2basic_explain_e",
            basicImgPath: "/images/card2.png",
            basicClear: false,
            basicScore: 2,
            basicLocked: "2basic_locked",
          },
        ];
        setCardInfoList(jsonInfo);
      });
  }, []);

  const goToStage = (stageId) => {
    navigate(`/practice/basics/stage`, { state: { stageId: stageId } });
  };

  return (
    <>
      <BasicTemplate
        cards={cardInfoList.map((value) =>
          t("language") === "KOR" ? (
            <BasicCard
              onClick={goToStage}
              key={value.basicId}
              stageId={value.basicId}
              title={value.basicName}
              desc={value.basicExplain}
              img={value.basicImgPath}
              clear={value.basicClear}
              score={value.basicScore}
              locked={value.basicLocked}
            />
          ) : (
            <BasicCard
              onClick={goToStage}
              stageId={value.basicId}
              key={value.basicId}
              title={value.basicNameE}
              desc={value.basicExplainE}
              img={value.basicImgPath}
              clear={value.basicClear}
              score={value.basicScore}
              locked={value.basicLocked}
            />
          )
        )}
      ></BasicTemplate>
    </>
  );
}

export default Basics;
