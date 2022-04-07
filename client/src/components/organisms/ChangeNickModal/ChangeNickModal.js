import { useSetRecoilState } from "recoil";
import { changeNickname } from "recoils";
import Icon from "components/atoms/Icons/Icon";
import {
  ButtonLight,
  ErrorMsg,
  InputBox,
  ModalBox,
  ModalContent,
  ModalHeader,
  ModalSection,
  NicknameInput,
  OverLay,
  Title,
} from "./ChangeNickModal.styled";
import { useState } from "react";
import axiosInstance from "utils/API";
import { t } from "i18next";

const ChangeNickModal = () => {
  const isOpen = useSetRecoilState(changeNickname);
  const [nickname, setNickname] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [isNickname, setIsNickname] = useState(false);

  const onChangeNickname = (e) => {
    const current = e.target.value;
    setNickname(current);
    if (current.length > 20) {
      setNicknameMsg("less than 20");
      setIsNickname(false);
    } else {
      axiosInstance.get(`/api/user/usernick/${current}`, {}).then((res) => {
        console.log(res);
        if (res.isUsed) {
          setNicknameMsg("used");
          setIsNickname(false);
        } else {
          setIsNickname(true);
        }
      });
    }
  };

  const onClickNicknameChange = () => {
    axiosInstance
      .patch("/api/user/userinfoedit", { userNick: nickname })
      .then((res) => window.location.reload());
  };
  return (
    <OverLay>
      <ModalBox>
        <ModalSection>
          <ModalHeader>
            <Icon icon="xBtn" onClick={() => isOpen(false)} />
          </ModalHeader>
          <Title>{t("edit nickname")}</Title>
          <ModalContent>
            <InputBox>
              <NicknameInput onChange={onChangeNickname} />
              <ErrorMsg>{t(nicknameMsg)}</ErrorMsg>
            </InputBox>
            <ButtonLight onClick={onClickNicknameChange}>
              {t("change")}
            </ButtonLight>
          </ModalContent>
        </ModalSection>
      </ModalBox>
    </OverLay>
  );
};
export default ChangeNickModal;
