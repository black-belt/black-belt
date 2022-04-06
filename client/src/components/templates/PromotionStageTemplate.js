import Countdown from "components/organisms/Timer/Countdown";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colors } from "../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";

function PromotionStageTemplate({
  // title,
  camera,
  // totalSeconds,
  // initialSeconds,
  // initialProgress,
  level,
  info,
  curNum,
  // videoText,
  isTimer,
  setIsTimer,
  curMotion,
}) {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <TextContainer>
          <TitleContainer language={t("language")}>
            {t("language") === "KOR" ? level + "단" : level + "dan"}
          </TitleContainer>
          <DescContainer>{curMotion}</DescContainer>
        </TextContainer>
        <VideoContainer>
          <UserContainer>
            {!isTimer && (
              <VideoText>
                {t("language") === "KOR"
                  ? "기본 준비 자세를 취하면 시작됩니다."
                  : "Start by doing the basic ready stance."}
              </VideoText>
            )}
            {camera}
          </UserContainer>
          <InfoContainer>
            <TimerContainer>
              <Countdown
                totalSeconds={curNum === 0 ? info.randomPoomsaeTime : info.essentialPoomsaeTime}
                // initialSeconds={initialSeconds}
                // initialProgress={initialProgress}
                isTimer={isTimer}
                setIsTimer={setIsTimer}
              />
            </TimerContainer>
            <InfoText>
              {curNum === 0 ? (
                <SelectedBlock>
                  <TextTitle>{t("language") === "KOR" ? "지정품새" : "Random"}</TextTitle>
                  <TextType>
                    {t("language") === "KOR" ? info.randomPoomsaeName : info.randomPoomsaeNameE}
                  </TextType>
                </SelectedBlock>
              ) : (
                <UnSelectedBlock>
                  <TextTitle>{t("language") === "KOR" ? "지정품새" : "Random"}</TextTitle>
                  <TextType>
                    {t("language") === "KOR" ? info.randomPoomsaeName : info.randomPoomsaeNameE}
                  </TextType>
                </UnSelectedBlock>
              )}
              {curNum === 1 ? (
                <SelectedBlock>
                  <TextTitle>{t("language") === "KOR" ? "필수품새" : "Essential"}</TextTitle>
                  <TextType>
                    {t("language") === "KOR"
                      ? info.essentialPoomsaeName
                      : info.essentialPoomsaeNameE}
                  </TextType>
                </SelectedBlock>
              ) : (
                <UnSelectedBlock>
                  <TextTitle>{t("language") === "KOR" ? "필수품새" : "Essential"}</TextTitle>
                  <TextType>
                    {t("language") === "KOR"
                      ? info.essentialPoomsaeName
                      : info.essentialPoomsaeNameE}
                  </TextType>
                </UnSelectedBlock>
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
  background-image: url("/images/promotionBackground.jpg");
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
  margin: 50px 0 50px 10%;
  display: flex;
`;

const TitleContainer = styled.div`
  /* width: 100%; */
  height: 90px;
  margin-top: 10px;
  font-weight: ${fontWeight.extrabold};
  font-size: ${(props) => (props.language === "KOR" ? "6.5rem" : "5rem")};
  font-family: ${(props) => (props.language === "KOR" ? "Dokdo" : "Dry Brush")};
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
  width: 30%;
  height: 100%;
  min-height: 300px;
  min-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserContainer = styled.div`
  position: relative;
  width: 70%;
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

const DescContainer = styled.div`
  display: flex;
  padding: 0 0 30px 100px;
  align-items: flex-end;
  font-size: 2.2rem;
`;
