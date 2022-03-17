import React from "react";
import styled from "styled-components";
import { colors } from "../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";

function PromotionStageTemplate({ title, camera }) {
  return (
    <>
      <Container>
        <TextContainer>
          <TitleContainer>{title}</TitleContainer>
        </TextContainer>
        <VideoContainer>
          <UserContainer>{camera}</UserContainer>
          <InfoContainer></InfoContainer>
        </VideoContainer>
      </Container>
      <BackgroundImage
        src="images/promotionBackground.jpg"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
}

export default PromotionStageTemplate;

const BackgroundImage = styled.div`
  filter: grayscale(100%) brightness(70%);
  filter: gray;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("images/promotionBackground.jpg");
  background-size: 100% 100%;
  filter: grayscale(100%) brightness(40%);
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: calc(100% - 120px);
  width: 100%;
  padding: 100px 100px 0 100px;
  font-family: ${fontFamily.sans};
  color: ${colors.gray0};
  background-color: transparent;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 120px;
  flex-wrap: wrap;
  font-weight: ${fontWeight.regular};
  margin: 0 0 50px 90px;
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

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 40%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  justify-content: center;
`;

const UserContainer = styled.div`
  width: 60%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  // margin-bottom: 60px;
  justify-content: center;
`;
