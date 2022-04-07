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
            <ContentTitle>[{t("taekwondo1")}]</ContentTitle>
            <Contents>{t("taekwondo1-description")} </Contents>

            <ContentTitle>[{t("taekwondo2")}]</ContentTitle>
            <Contents>{t("taekwondo2-description1")}</Contents>
            <Contents>{t("taekwondo2-description2")}</Contents>
            <Contents>{t("taekwondo2-description3")}</Contents>

            <Title>{t("service")}</Title>
            <ContentTitle>[{t("service1")}]</ContentTitle>
            <ContentTitle>{t("service1-1")}</ContentTitle>
            <Contents>{t("service1-1 description1")}</Contents>
            <Contents>{t("service1-1 description2")}</Contents>
            <Contents>{t("service1-1 description3")}</Contents>
            <Contents>{t("service1-1 description4")}</Contents>
            <Contents>{t("service1-1 description5")}</Contents>
            <ContentTitle>{t("service1-2")}</ContentTitle>
            <Contents>{t("service1-2 description1")}</Contents>
            <Contents>{t("service1-2 description2")}</Contents>
            <Contents>{t("service1-2 description3")}</Contents>
            <Contents>{t("service1-2 description4")}</Contents>
            <Contents>{t("service1-2 description5")}</Contents>
            <ContentTitle>{t("service1-3")}</ContentTitle>
            <Contents>{t("service1-3 description1")}</Contents>
            <Contents>{t("service1-3 description2")}</Contents>
            <Contents>{t("service1-3 description3")}</Contents>
            <Contents>{t("service1-3 description4")}</Contents>
            <Contents>{t("service1-3 description5")}</Contents>
            <br></br>

            <ContentTitle>[{t("service2")}]</ContentTitle>
            <Contents>{t("service2 description1")}</Contents>
            <Contents>{t("service2 description2")}</Contents>
            <Contents>{t("service2 description3")}</Contents>
            <Contents>{t("service2 description4")}</Contents>

            <ContentTitle>[{t("service3")}]</ContentTitle>
            <Contents>{t("service3 description1")}</Contents>
            <Contents>{t("service3 description2")}</Contents>
            <Contents>{t("service3 description3")}</Contents>
            <Contents>{t("service3 description4")}</Contents>
            <Contents>{t("service3 description5")}</Contents>
            <Contents>{t("service3 description6")}</Contents>
            <Contents>{t("service3 description7")}</Contents>
            <Contents>{t("service3 description8")}</Contents>
          </ModalContent>
        </ModalSection>
      </ModalBox>
    </OverLay>
  );
};
export default TaekwonDoModal;
