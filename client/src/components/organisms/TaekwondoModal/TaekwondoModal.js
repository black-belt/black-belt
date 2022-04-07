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
          <ModalContent>
            <Title>ABOUT TAEKWONDO</Title>
            <ContentTitle>{t("taekwondo1")}</ContentTitle>
            <Contents>{t("taekwondo1-description")} </Contents>

            <ContentTitle>{t("taekwondo2")}</ContentTitle>
            <Contents>{t("taekwondo2-description1")}</Contents>
            <Contents>{t("taekwondo2-description2")}</Contents>
            <Contents>{t("taekwondo2-description3")}</Contents>

            <Title>{t("service")}</Title>
            <ContentTitle>{t("service1")}</ContentTitle>
          </ModalContent>
        </ModalSection>
      </ModalBox>
    </OverLay>
  );
};
export default TaekwonDoModal;
