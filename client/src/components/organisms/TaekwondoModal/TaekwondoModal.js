import Icon from "components/atoms/Icons/Icon";
import { t } from "i18next";
import { useSetRecoilState } from "recoil";
import { taekwondoModal } from "recoils";
import {
  OverLay,
  ModalBox,
  ModalSection,
  ModalHeader,
  Title,
  ModalContent,
  ContentTitle,
  Contents,
} from "./TaekwondoModal.styled";

const TaekwonDoModal = () => {
  const isOpen = useSetRecoilState(taekwondoModal);
  return (
    <OverLay>
      <ModalBox>
        <ModalSection>
          <ModalHeader>
            <Icon icon="xBtn" onClick={() => isOpen(false)} />
          </ModalHeader>
          <Title>ABOUT TAEKWONDO</Title>
          <ModalContent>
            <ContentTitle>{t("taekwondo1")}</ContentTitle>
            <Contents>{t("taekwondo1-description")} </Contents>
          </ModalContent>
        </ModalSection>
      </ModalBox>
    </OverLay>
  );
};
export default TaekwonDoModal;
