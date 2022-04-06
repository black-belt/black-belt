import Timer from "components/atoms/Timer";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../_foundation";
import InfoBar from "./InfoBar";

function ScoreBar({ left, right, isTimer, setIsTimer, leftPercent, rightPercent, end }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const totalSecnds = 60;

  const handleTimer = (elapsedSeconds) => {
    setElapsedSeconds(elapsedSeconds);
  };
  return (
    <Container>
      <LeftBarContainer>
        <LeftBarGray />
        <LeftBarColor percent={leftPercent} />
        {left && <InfoBar left country={left.country} nickname={left.nickname} />}
      </LeftBarContainer>
      <Time>
        {totalSecnds - elapsedSeconds}
        <Timer
          initialSeconds={0}
          totalSeconds={totalSecnds}
          onChange={handleTimer}
          interval={1000}
          isTimer={isTimer}
          setIsTimer={setIsTimer}
          end={end}
        />
      </Time>
      <RightBarContainer>
        <RightBarGray />
        <RightBarColor percent={rightPercent} />
        {right.length > 0 && <InfoBar country={right[0].country} nickname={right[0].nickname} />}
      </RightBarContainer>
    </Container>
  );
}
export default ScoreBar;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 70px;
  display: flex;
`;

const LeftBarContainer = styled.div`
  position: relative;
  width: 43%;
  height: 100%;
  /* padding: 70px 10px 0 70px; */
`;

const Time = styled.div`
  width: 14%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Dokdo;
  font-size: 8rem;
`;

const RightBarContainer = styled.div`
  position: relative;
  width: 43%;
  height: 100%;
  /* padding: 70px 70px 0 10px; */
`;

const LeftBarGray = styled.div`
  position: absolute;
  background-color: ${colors.gray5};
  left: 0;
  top: 70px;
  height: 40px;
  width: 100%;
  border-radius: 10px;
`;

const RightBarGray = styled.div`
  position: absolute;
  background-color: ${colors.gray5};
  right: 0;
  top: 70px;
  height: 40px;
  width: 100%;
  border-radius: 10px;
`;
const LeftBarColor = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #00b7be -80%, rgba(0, 183, 190, 0) 50%), #003c74;
  left: 0;
  top: 70px;
  height: 40px;
  width: ${(props) => props.percent}%;
  border-radius: 10px;
  transition: 0.3s;
`;
const RightBarColor = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #00b7be -80%, rgba(0, 183, 190, 0) 50%), #003c74;
  right: 0;
  top: 70px;
  height: 40px;
  width: ${(props) => props.percent}%;
  border-radius: 10px;
  transition: 0.3s;
`;
