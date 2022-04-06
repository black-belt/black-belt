import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { colors, fontWeight } from "_foundation";

function PartStage({ partArray, curIdx }) {
  const { t } = useTranslation();
  return (
    <Container language={t("language")}>
      {partArray.map((desc, index) =>
        index === curIdx ? (
          <CurPart key={index}>{desc}</CurPart>
        ) : (
          <Part key={index}>{desc}</Part>
        )
      )}
    </Container>
  );
}

export default PartStage;

const Container = styled.div`
  ${(props) =>
    props.language === "ENG" &&
    css`
      font-family: Dry Brush;
      font-size: 3rem;
      line-height: 150%;
    `}
  ${(props) =>
    props.language === "KOR" &&
    css`
      font-family: Dokdo;
      font-size: 3.5rem;
      line-height: 120%;
    `}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: ${colors.gray0};
  margin-left: 100px;
`;

const Part = styled.div`
  font-family: inherit;
  font-weight: ${fontWeight.medium};
  margin: 10px 20px 10px 0;
`;

const CurPart = styled.div`
  font-family: inherit;
  font-weight: ${fontWeight.bold};
  color: ${colors.blue0};
  margin: 0 20px 0 0;
`;
