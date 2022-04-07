import styled, { css } from "styled-components";
import { colors, fontSize } from "../../_foundation";
import { useTranslation } from "react-i18next";
import BottomButtonList from "components/molecules/BottomButtonList";
import PoomsaeCard from "components/molecules/PoomsaeCard";
import CustomIcon from "../atoms/Icons/Icon";

function PoomsaeTemplate({
  buttons,
  selectedPoomsaeIdx,
  changePoomsae,
  selectedPoomsaeInfo,
  goToStage,
  imageNum,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <TopContainer>
          <TextContainer>
            <Title language={t("language")}>
              {t("language") === "KOR"
                ? selectedPoomsaeInfo.poomsae_name
                : selectedPoomsaeInfo.poomsae_name_e}
            </Title>
            <Stars>
              <Star>
                <CustomIcon
                  icon={selectedPoomsaeInfo.poomsae_score > 0 ? "goldStar" : "blackStar"}
                  viewBox="0 0 55 55"
                  width="40"
                  height="40"
                />
              </Star>
              <Star>
                <CustomIcon
                  icon={selectedPoomsaeInfo.poomsae_score > 1 ? "goldStar" : "blackStar"}
                  viewBox="0 0 55 55"
                  width="40"
                  height="40"
                />
              </Star>
              <Star>
                <CustomIcon
                  icon={selectedPoomsaeInfo.poomsae_score > 2 ? "goldStar" : "blackStar"}
                  viewBox="0 0 55 55"
                  width="40"
                  height="40"
                />
              </Star>
            </Stars>

            {selectedPoomsaeInfo && (
              <Description>
                {t("language") === "KOR"
                  ? selectedPoomsaeInfo.poomsae_desc
                  : selectedPoomsaeInfo.poomsae_desc_e}
              </Description>
            )}
          </TextContainer>
          <CardContainer>
            <PoomsaeCard
              title={
                t("language") === "KOR"
                  ? selectedPoomsaeInfo.poomsae_name
                  : selectedPoomsaeInfo.poomsae_name_e
              }
              img={`/images/combo/combo${imageNum}.png`}
              clear={selectedPoomsaeInfo.poomsae_clear}
              score={selectedPoomsaeInfo.poomsae_score}
              locked={selectedPoomsaeInfo.poomsae_locked}
              onClick={goToStage}
            />
          </CardContainer>
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

export default PoomsaeTemplate;

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
  width: 40%;
  height: 100%;
  padding: 25vh 90px 0 150px;
`;

const Title = styled.div`
  ${(props) =>
    props.language === "ENG" &&
    css`
      font-family: Dry Brush;
      font-size: 4rem;
      line-height: 150%;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      font-family: Dokdo;
      font-size: 6.5rem;
      line-height: 120%;
    `}
`;

const Stars = styled.div`
  padding: 10px 10px 10px 0;
  display: flex;
`;

const Star = styled.div`
  padding-left: 10px;
`;

const Description = styled.div`
  padding-top: 20px;
  font-family: inherit;
  font-size: ${fontSize.xl};
  letter-spacing: 0.5px;
  line-height: 1.8rem;
`;

const CardContainer = styled.div`
  width: 60%;
  height: 100%;
  padding: 25vh 200px 0 0;
  /* padding: 100px 110px 0 0; */
  /* position: relative; */
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
