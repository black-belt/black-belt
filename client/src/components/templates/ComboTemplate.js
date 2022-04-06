import styled, { css } from "styled-components";
import { colors, fontSize } from "../../_foundation";
import { useTranslation } from "react-i18next";
import SmallCarousel from "components/molecules/Carousel/SmallCarousel";
import BottomButtonList from "components/molecules/BottomButtonList";

function ComboTemplate({
  buttons,
  selectedPoomsaeIdx,
  changePoomsae,
  selectedPoomsaeInfo,
  selectedChapterIdx,
  changeChapter,
  goToStage,
  imageList,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <TopContainer>
          <TextContainer language={t("language")}>
            <TitleContainer language={t("language")}>
              <Title language={t("language")}>
                {t("language") === "KOR"
                  ? selectedPoomsaeInfo.poomsae_name
                  : selectedPoomsaeInfo.poomsae_name_e}
              </Title>
              <SubTitle language={t("language")}>
                {t("language") === "KOR"
                  ? selectedChapterIdx + 1 + " 단락"
                  : "Chapter " + selectedChapterIdx + 1}
              </SubTitle>
            </TitleContainer>
            {selectedPoomsaeInfo.comboList && (
              <DescriptionContainer>
                {t("language") === "KOR"
                  ? selectedPoomsaeInfo.comboList[selectedChapterIdx].combo_explain
                      .slice(0, 8)
                      .map((value, index) => <Description key={index}>{value}</Description>)
                  : selectedPoomsaeInfo.comboList[selectedChapterIdx].combo_explain_e
                      .slice(0, 8)
                      .map((value, index) => <Description key={index}>{value}</Description>)}
                {selectedPoomsaeInfo.comboList[selectedChapterIdx].combo_explain.length > 8
                  ? "..."
                  : null}
              </DescriptionContainer>
            )}
          </TextContainer>
          <CarouselContainer>
            <SmallCarousel
              items={selectedPoomsaeInfo.comboList}
              active={selectedChapterIdx}
              setActive={changeChapter}
              goToStage={goToStage}
              imageList={imageList}
            ></SmallCarousel>
          </CarouselContainer>
        </TopContainer>
        <ButtonContainer>
          <BottomButtonList
            buttons={buttons}
            selectedPoomsaeIdx={selectedPoomsaeIdx}
            changePoomsae={changePoomsae}
          />
        </ButtonContainer>
      </Container>
      <BackgroundImage />
    </>
  );
}

export default ComboTemplate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: ${colors.gray0};
  overflow: hidden;
`;

const TopContainer = styled.div`
  display: flex;
  height: 80%;
`;

const TextContainer = styled.div`
  display: flex;
  width: 35%;
  height: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  ${(props) =>
    props.language === "ENG" &&
    css`
      padding: 13vh 90px 0 150px;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      padding: 13vh 0 0 12vw;
    `};
`;

const TitleContainer = styled.div`
  display: flex;
  ${(props) =>
    props.language === "ENG" &&
    css`
      font-family: Dry Brush;
      flex-direction: column;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      font-family: Dokdo;
      flex-direction: row;
      align-items: center;
    `};
`;

const Title = styled.div`
  height: fit-content;
  ${(props) =>
    props.language === "ENG" &&
    css`
      line-height: 150%;
      font-size: 5rem;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      font-size: 6.5rem;
      line-height: 120%;
      padding-right: 30px;
    `}
`;

const SubTitle = styled.div`
  height: fit-content;
  ${(props) =>
    props.language === "ENG" &&
    css`
      line-height: 150%;
      font-size: 3rem;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      line-height: 120%;
      font-size: 3.5rem;
    `}
`;

const DescriptionContainer = styled.div`
  padding-top: 20px;
  font-family: inherit;
  font-size: ${fontSize.xl};
  letter-spacing: 0.5px;
`;

const Description = styled.div`
  padding-top: 10px;
`;

const CarouselContainer = styled.div`
  width: 65%;
  height: 100%;
  /* padding: 100px 110px 0 0; */
  position: relative;
  flex-wrap: wrap;
  align-content: center;
`;

const BackgroundImage = styled.div`
  filter: gray;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("/images/promotionBackground.jpg");
  background-size: 100% 100%;
  filter: grayscale(100%) brightness(20%);
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
`;

const ButtonContainer = styled.div`
  /* height: 20%; */
  padding-top: 40px;
`;
