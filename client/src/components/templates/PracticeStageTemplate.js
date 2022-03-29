import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";
import { useTranslation } from "react-i18next";

function PracticeStageTemplate({ title, desc, video, camera, partStage }) {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <TextContainer>
        <TitleContainer language={t("language")}>
          {title}
          {partStage}
        </TitleContainer>
        <DescContainer>{desc}</DescContainer>
      </TextContainer>
      <VideoContainer>
        <DemonContainer>{video}</DemonContainer>
        <UserContainer>{camera}</UserContainer>
      </VideoContainer>
      <BackgroundImage src="../../images/practiceBackground.jpg" />
    </Container>
  );
}

export default PracticeStageTemplate;

const BackgroundImage = styled.img`
  filter: grayscale(100%) brightness(70%);
  filter: gray;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: calc(100% - 120px);
  width: 100%;
  padding: 150px 100px 0 100px;
  font-family: ${fontFamily.sans};
  color: ${colors.gray0};
  // background-image: linear-gradient(black, black), url("../../images/practiceBackground.jpg");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-blend-mode: color;
  // background-clip: border-box;
  // filter: grayscale(100%) brightness(50%);
`;

const TextContainer = styled.div`
  width: 93%;
  height: 200px;
  flex-wrap: wrap;
  font-weight: ${fontWeight.regular};
  margin: 0 0 50px 55px;
`;

const TitleContainer = styled.div`
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
  width: 100%;
  height: 90px;
  margin-top: 10px;
  font-weight: ${fontWeight.extrabold};
  display: flex;
  align-items: center;
`;

const DescContainer = styled.div`
  width: 100%;
  height: 60px;
  padding-top: 40px;
  display: flex;
  font-size: ${fontSize.xl};
  align-items: flex-start;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const DemonContainer = styled.div`
  width: 50%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  justify-content: center;
`;

const UserContainer = styled.div`
  width: 50%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  // margin-bottom: 60px;
  justify-content: center;
`;
