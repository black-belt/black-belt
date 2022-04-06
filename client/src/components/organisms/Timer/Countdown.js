import React, { useState } from "react";
import ProgressBar from "react-customizable-progressbar";
import Timer from "components/atoms/Timer";
import Indicator from "./Indecator";
import styled from "styled-components";
import { colors } from "../../../_foundation";

const Countdown = ({ totalSeconds, isTimer, setIsTimer }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progress, setProgress] = useState(0);

  const roundProgress = (progress) => {
    const factor = Math.pow(10, 2);
    return Math.round(progress * factor) / factor;
  };

  const handleTimer = (elapsedSeconds) => {
    const progress = roundProgress((elapsedSeconds / totalSeconds) * 100);
    setProgress(progress);
    setElapsedSeconds(elapsedSeconds);
  };

  return (
    <div className="countdown">
      <ProgressBarContainer>
        <ProgressBar
          radius={140}
          progress={progress}
          strokeWidth={13}
          strokeColor={colors.blue0}
          trackStrokeWidth={7}
          trackStrokeColor={colors.gray0}
          pointerRadius={11}
          pointerFill="white"
          pointerStrokeWidth={5}
          pointerStrokeColor={colors.blue0}
        >
          <Indicator
            totalSeconds={totalSeconds}
            initialSeconds={0}
            elapsedSeconds={elapsedSeconds}
          />
        </ProgressBar>
      </ProgressBarContainer>

      {totalSeconds !== 0 && (
        <Timer
          initialSeconds={0}
          totalSeconds={totalSeconds}
          onChange={handleTimer}
          interval={1000}
          isTimer={isTimer}
          setIsTimer={setIsTimer}
        />
      )}
    </div>
  );
};

export default Countdown;

const ProgressBarContainer = styled.div`
  margin-bottom: 40px;
`;
