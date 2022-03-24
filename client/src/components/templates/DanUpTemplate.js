import styled, { keyframes } from "styled-components";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";
import { colors } from "../../_foundation/colors";
// import { ReactComponent as.div} from "public\icons\star.svg";

function DanUpTemplate({ dan, restart, home }) {
  return (
    <Background>
      <Middle>
        <Level>
          <LevelImage src={`../../certifications/dan${dan}.png`} />
        </Level>
        <ButtonContainer>
          <RestartButton>{restart}</RestartButton>
          <HomeButton>{home}</HomeButton>
        </ButtonContainer>
      </Middle>
    </Background>
  );
}

export default DanUpTemplate;

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

const LevelImage = styled.img`
  width: 20vw;
`;

const Level = styled.div`
  /* font-size: ${fontSize.h1};
  font-family: ${fontFamily.sans};
  font-weight: ${fontWeight.extrabold};
  color: ${colors.gray0}; */
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 60px;
`;

const RestartButton = styled.div`
  font-family: ${fontFamily.sans};
  margin-right: 20px;
`;

const HomeButton = styled.div`
  font-family: ${fontFamily.sans};
  margin-left: 20px;
`;
