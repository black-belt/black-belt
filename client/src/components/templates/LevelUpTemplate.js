import styled, { keyframes } from "styled-components";
import { fontFamily, fontSize, fontWeight } from "../../_foundation/typography";
import { colors } from "../../_foundation/colors";
// import { ReactComponent as.div} from "public\icons\star.svg";

function LevelUpTemplate({ level }) {
  return (
    <Background>
      <Middle>
        <Congratulation>Congratulations!</Congratulation>
        <Level>You got a {level}</Level>
      </Middle>
    </Background>
  );
}

export default LevelUpTemplate;

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
  z-index: 2;
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

const Congratulation = styled.div`
  font-size: ${fontSize.h2};
  font-family: ${fontFamily.sans};
  font-weight: ${fontWeight.extrabold};
  color: ${colors.gray0};
  margin-bottom: 20px;
`;

const Level = styled.div`
  font-size: ${fontSize.h1};
  font-family: ${fontFamily.sans};
  font-weight: ${fontWeight.extrabold};
  color: ${colors.gray0};
`;
