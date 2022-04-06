import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";
import { useTranslation } from "react-i18next";

function BasicTemplate({ cards }) {
  const { t } = useTranslation();
  const title = "basics";
  const explanations = "basics description";
  return (
    <>
      <Container>
        <TextContainer>
          <Title language={t("language")}>{t(title)}</Title>
          <Description>{t(explanations)}</Description>
        </TextContainer>
        {cards && <CardContainer>{cards}</CardContainer>}
      </Container>
      <BackgroundImage />
    </>
  );
}

export default BasicTemplate;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  color: ${colors.gray0};
`;

const TextContainer = styled.div`
  width: 30%;
  height: 100%;
  padding: 40vh 90px 0 90px;
`;

const Title = styled.div`
  ${(props) =>
    props.language === "ENG" &&
    css`
      font-family: Dry Brush;
      font-size: 5rem;
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

const Description = styled.div`
  padding-top: 20px;
  font-family: inherit;
  font-size: ${fontSize.xl};
  letter-spacing: 0.5px;
`;

const CardContainer = styled.div`
  width: 70%;
  height: 100%;
  padding: 100px 110px 0 0;
  display: flex;
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
