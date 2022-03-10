import React from "react";
import styled from "styled-components";

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
  filter: grayscale(100%) brightness(60%);
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
  // background-color: #000000;
  height: 100%;
  width: 100%;
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
  // background-color: #ff0000;
`;

const TitleContainer = styled.div`
  width: 100%;
  // background-color: #ff0000;
`;

const DescContainer = styled.div`
  width: 100%;
  // background-color: #ff0000;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  // background-color: #00ffff;
`;

const DemonContainer = styled.div`
  width: 50%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  // background-color: #00ff00;
`;

const UserContainer = styled.div`
  width: 50%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  // background-color: #0000ff;
`;
