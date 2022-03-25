import ComboTemplate from "components/templates/ComboTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Combos() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 연결동작의 목록들을 받음
    // "poomsaeList":[
    //   {
    //       "poomsaeId": 1,
    //       "poomsaeName" :"poomsae_name",
    //       "poomsaeNameE" :"poomsae_name_e",
    //       "comboList": [
    //        {
    //            "comboId" : 1 ,
    //            "comboName" : "combo_name",
    //            "comboNameE" : "combo_name_e",
    //            "comboExplain" : "combo_explain",
    //            "comboExplainE" : "combo_explain_e",
    //             "comboImgPath" : "combo_img_path ",
    //            "comboClear" : "combo_clear",
    //            "comboScore" : "combo_score",
    //            "comboLocked" : "combo_locked"
    //        },
    //        {
    //            "comboId" : 2 ,
    //            "comboName" : "combo_name",
    //            "comboNameE" : "combo_name_e",
    //            "comboExplain" : "combo_explain",
    //            "comboExplainE" : "combo_explain_e",
    //            "comboImgPath" : "combo_img_path ",
    //            "comboClear" : "combo_clear",
    //            "comboScore" : "combo_score",
    //            "comboLocked" : "combo_locked"
    //        },
    //       ....
    //       ]
    //     },
    //     .....
    //     ]
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let jsonInfo = [];
        // setCardInfoList(jsonInfo);
      });
  }, []);

  const goToStage = (stageId) => {
    navigate(`/practice/combos/stage`, { state: { stageId: stageId } });
  };

  return <ComboTemplate></ComboTemplate>;
}

export default Combos;
