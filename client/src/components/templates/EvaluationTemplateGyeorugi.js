import styled, { keyframes } from "styled-components";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";
import { colors } from "../../_foundation/colors";

function EvaluationTemplateGyeorugi({ isWin, restart, home, tier }) {
  return (
    <Background>
      <Middle>
        <Text isWin={isWin}>{isWin ? "Victory" : "Defeat"}</Text>
        {tier && (
          <TierContainer>
            <TierImage src={`/images/tier/${tier.tier}.png`} />
            <Score>{tier.score}</Score>
          </TierContainer>
        )}
        {restart && (
          <ButtonContainer>
            <RestartButton>{restart}</RestartButton>
            <HomeButton>{home}</HomeButton>
          </ButtonContainer>
        )}
      </Middle>
    </Background>
  );
}

export default EvaluationTemplateGyeorugi;

const breatheAnimation = keyframes`
0% { opacity: 0.0; }
10% { opacity: 0.1; }
20% { opacity: 0.2; }
30% { opacity: 0.3; }
40% { opacity: 0.4; }
50% { opacity: 0.5; }
60% { opacity: 0.6; }
60% { opacity: 0.7; }
80% { opacity: 0.8; }
90% { opacity: 0.9; }
100% { opacity: 1; }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  animation-name: ${breatheAnimation};
  animation-duration: 0.5s;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 25%;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.75);
  // opacity: 0;
  transition: 1s linear;
`;

const Text = styled.div`
  position: absolute;
  top: 10%;
  font-size: 7rem;
  font-family: Dry Brush;
  font-weight: ${fontWeight.extrabold};
  padding-bottom: 50px;
  color: ${colors.gray0};
  color: ${(props) => (props.isWin ? "#428BC1" : "#B20828")};
`;

const TierContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  top: 48%;
`;

const TierImage = styled.img`
  width: 50px;
`;

const Score = styled.div`
  /* font-family: ${fontFamily.sans}; */
  padding-left: 20px;
  color: ${colors.gray0};
  font-size: 2.5rem;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 15%;
  display: flex;
  /* margin-top: 10px; */
`;

const RestartButton = styled.div`
  font-family: ${fontFamily.sans};
  margin-right: 20px;
`;

const HomeButton = styled.div`
  font-family: ${fontFamily.sans};
  margin-left: 20px;
`;
