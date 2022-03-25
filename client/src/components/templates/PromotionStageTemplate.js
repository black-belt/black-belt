import Countdown from "components/organisms/Timer/Countdown";
import React from "react";
import styled from "styled-components";
import { colors } from "../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";

function PromotionStageTemplate({
  title,
  camera,
  totalSeconds,
  initialSeconds,
  initialProgress,
  info,
  curNum,
  videoText,
  isTimer,
  setIsTimer,
}) {
  return (
    <>
      <Container>
        <TextContainer>
          <TitleContainer>{title}</TitleContainer>
        </TextContainer>
        <VideoContainer>
          <UserContainer>
            {!isTimer && <VideoText>{videoText}</VideoText>}
            {camera}
          </UserContainer>
          <InfoContainer>
            <TimerContainer>
              <Countdown
                totalSeconds={totalSeconds}
                initialSeconds={initialSeconds}
                initialProgress={initialProgress}
                isTimer={isTimer}
                setIsTimer={setIsTimer}
              />
            </TimerContainer>
            <InfoText>
              {info &&
                info.map((info, index) =>
                  curNum === index ? (
                    <SelectedBlock key={index}>
                      <TextTitle>{info[0]}</TextTitle>
                      <TextType>{info[1]}</TextType>
                    </SelectedBlock>
                  ) : (
                    <UnSelectedBlock key={index}>
                      <TextTitle>{info[0]}</TextTitle>
                      <TextType>{info[1]}</TextType>
                    </UnSelectedBlock>
                  )
                )}
            </InfoText>
          </InfoContainer>
        </VideoContainer>
      </Container>
      <BackgroundImage />
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
  padding: 100px 100px 0 0;
  font-family: ${fontFamily.sans};
  color: ${colors.gray0};
  background-color: transparent;
`;

const TextContainer = styled.div`
  width: 91%;
  height: 120px;
  flex-wrap: wrap;
  font-weight: ${fontWeight.regular};
  margin: 50px 0 50px 13%;
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
  width: 35%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserContainer = styled.div`
  position: relative;
  width: 65%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  // margin-bottom: 60px;
  justify-content: center;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoText = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SelectedBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  padding: 1rem 2.3rem;
  margin: 0 20px 30px 20px;

  border-radius: 4rem;
  border: 1px solid ${colors.gray0};
  color: ${colors.blue1};
  background-color: ${colors.gray0};

  font-family: inherit;
  font-size: ${fontSize.xl};
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;
`;

const UnSelectedBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  padding: 0.9rem 2.3rem;
  margin: 0 20px 30px 20px;

  border-radius: 4rem;
  border: 1px solid ${colors.gray0};
  color: ${colors.gray0};
  background-color: transparent;

  font-family: inherit;
  line-height: 1.75rem;
  text-align: center;
  text-decoration: none;
`;

const TextTitle = styled.div`
  font-family: inherit;
  font-size: ${fontSize.h4};
  margin-right: 10px;
`;

const TextType = styled.div`
  font-size: ${fontSize.h3};
  font-weight: ${fontWeight.medium};
`;

const VideoText = styled.div`
  position: absolute;
  top: 10%;
  background-color: ${colors.gray7};
  background-color: rgba(83, 87, 91, 0.7);
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: ${fontWeight.regular};
`;
