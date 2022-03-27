import ComboTemplate from "components/templates/ComboTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Combos() {
  const { t, i18n } = useTranslation();
  const [poomsaeList, setPoomsaeList] = useState([]);
  // const [poomsaeListKor, setPoomsaeListKor] = useState([]);
  // const [poomsaeListEng, setPoomsaeListEng] = useState([]);
  const [selectedPoomsaeIdx, setSelectedPoomsaeIdx] = useState(0);
  const [selectedPoomsaeInfo, setSelectedPoomsaeInfo] = useState([]);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //받기: api 통신해서 연결동작의 목록들을 받음
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let jsonInfo = [
          {
            poomsaeId: 1,
            poomsaeName: "품새 이름1",
            poomsaeNameE: "poomsae_name_e1",
            comboList: [
              {
                comboId: 1,
                comboName: "1콤보",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain1",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2콤보",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain2",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "3콤보",
                comboNameE: "combo_name_e",
                comboExplain: "3combo_explain3",
                comboExplainE: "3combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "4콤보",
                comboNameE: "2combo_name_e",
                comboExplain: "4combo_explain4",
                comboExplainE: "4combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 2,
            poomsaeName: "품새 이름2",
            poomsaeNameE: "poomsae_name_e2",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2번콤보combo_explain",
                comboExplainE: "2번콤보combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "4품!combo_explain",
                comboExplainE: "4combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 3,
            poomsaeName: "품새 이름3",
            poomsaeNameE: "poomsae_name_e3",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 4,
            poomsaeName: "품새 이름4",
            poomsaeNameE: "poomsae_name_e4",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 5,
            poomsaeName: "품새 이름5",
            poomsaeNameE: "poomsae_name_e5",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 6,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 7,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 8,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 9,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 10,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 11,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 12,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 13,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 14,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 15,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
          {
            poomsaeId: 16,
            poomsaeName: "품새 이름",
            poomsaeNameE: "poomsae_name_e",
            comboList: [
              {
                comboId: 1,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 2,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
              {
                comboId: 3,
                comboName: "combo_name",
                comboNameE: "combo_name_e",
                comboExplain: "combo_explain",
                comboExplainE: "combo_explain_e",
                comboImgPath: "combo_img_path ",
                comboClear: "combo_clear",
                comboScore: "combo_score",
                comboLocked: "combo_locked",
              },
              {
                comboId: 4,
                comboName: "2combo_name",
                comboNameE: "2combo_name_e",
                comboExplain: "2combo_explain",
                comboExplainE: "2combo_explain_e",
                comboImgPath: "2combo_img_path ",
                comboClear: "2combo_clear",
                comboScore: "2combo_score",
                comboLocked: "2combo_locked",
              },
            ],
          },
        ];
        setPoomsaeList(jsonInfo);
        setSelectedPoomsaeInfo(jsonInfo[0]);
        setImageList(makeRandom());
        // let listKor = jsonInfo.map((value) => {
        //   let newValue = {
        //     poomsaeId: value.poomsaeId,
        //     poomsaeName: value.poomsaeName,
        //     comboList: value.comboList.map((comboValue) => {
        //       return {
        //         comboId: comboValue.comboId,
        //         comboName: comboValue.comboName,
        //         comboExplain: comboValue.comboExplain,
        //         comboImgPath: comboValue.comboImgPath,
        //         comboClear: comboValue.comboClear,
        //         comboScore: comboValue.comboScore,
        //         comboLocked: comboValue.comboLocked,
        //       };
        //     }),
        //   };
        //   return newValue;
        // });
        // let listEng = jsonInfo.map((value) => {
        //   let newValue = {
        //     poomsaeId: value.poomsaeId,
        //     poomsaeName: value.poomsaeNameE,
        //     comboList: value.comboList.map((comboValue) => {
        //       return {
        //         comboId: comboValue.comboId,
        //         comboName: comboValue.comboNameE,
        //         comboExplain: comboValue.comboExplainE,
        //         comboImgPath: comboValue.comboImgPath,
        //         comboClear: comboValue.comboClear,
        //         comboScore: comboValue.comboScore,
        //         comboLocked: comboValue.comboLocked,
        //       };
        //     }),
        //   };
        //   return newValue;
        // });
        // setPoomsaeListKor(listKor);
        // setPoomsaeListEng(listEng);
        // jsonInfo.map((value) => titlesEng.push(value.poomsaeNameE));
        // setPoomsaeTitlesKor(titles);
        // setCardInfoList(jsonInfo);
      });
  }, []);

  const goToStage = (stageId) => {
    console.log(selectedPoomsaeInfo.comboList[stageId].comboId);
    navigate(`/practice/combos/stage`, {
      state: { stageId: selectedPoomsaeInfo.comboList[stageId].comboId },
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
          ? poomsaeList.map((value) => value.poomsaeName)
          : poomsaeList.map((value) => value.poomsaeNameE)
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
