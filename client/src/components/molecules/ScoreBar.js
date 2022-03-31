import styled from "styled-components";
import { colors, fontSize } from "../../_foundation";

function ScoreBar() {
  return (
    <Container>
      <LeftBarContainer />
      <Time />
      <RightBarContainer />
    </Container>
  );
}
export default ScoreBar;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftBarContainer = styled.div`
  background-color: aliceblue;
  position: relative;
  width: 45%;
  height: 100%;
`;

const Time = styled.div`
  background-color: antiquewhite;
  width: 10%;
  height: 100%;
`;

const RightBarContainer = styled.div`
  background-color: aliceblue;
  position: relative;
  width: 45%;
  height: 100%;
`;

const LeftBarGray = styled.div`
  background-color: ${colors.gray0};
`;
const RightBarGray = styled.div``;
const LeftBarColor = styled.div``;
const RightBarColor = styled.div``;
