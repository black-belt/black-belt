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
    </Container>
  );
}

export default PracticeStageTemplate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #000000;
  height: 100%;
  width: 100%;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 200px;
  flex-wrap: wrap;
  background-color: #ff0000;
`;

const TitleContainer = styled.div`
  width: 100%;
  background-color: #ff0000;
`;

const DescContainer = styled.div`
  width: 100%;
  background-color: #ff0000;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  background-color: #00ffff;
`;

const DemonContainer = styled.div`
  width: 50%;
  height: 100%;
  min-height: 500px;
  min-width: 500px;
  background-color: #00ff00;
`;

const UserContainer = styled.div`
  width: 50%;
  height: 100%;
  min-height: 500px;
  min-width: 500px;
  background-color: #0000ff;
`;

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 1fr 1fr 1fr;
//   background-color: #000000;
//   height: 100%;
//   width: 100%;
// `;

// const TextContainer = styled.div`
//   grid-column: 1 / 3;
//   grid-row: 1 / 2;
//   background-color: #ff0000;
// `;

// const TitleContainer = styled.div`
//   background-color: #ff0000;
// `;

// const DescContainer = styled.div`
//   background-color: #ff0000;
// `;

// const DemonContainer = styled.div`
//   grid-column: 1 / 2;
//   grid-row: 2 / 4;
//   background-color: #00ff00;
// `;

// const UserContainer = styled.div`
//   grid-column: 2 / 3;
//   grid-row: 2 / 4;
//   background-color: #0000ff;
// `;
