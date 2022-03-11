import React from "react";
import styled from "styled-components";
import { colors } from "../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";

function PracticeStageTemplate({ title, desc, video, camera }) {
  return (
    <Container>
      <TextContainer>
        <TitleContainer>{title}</TitleContainer>
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
  width: calc(100% - 200px);
  padding: 100px 100px 0 100px;
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
  width: 100%;
  height: 200px;
  flex-wrap: wrap;
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.regular};
  padding: 0 0 90px 50px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 10px;
  font-weight: ${fontWeight.extrabold};
  font-size: ${fontSize.h1};
  display: flex;
  align-items: center;
`;

const DescContainer = styled.div`
  width: 100%;
  height: 60px;
  padding-top: 40px;
  display: flex;
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
