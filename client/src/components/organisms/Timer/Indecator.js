import moment from "moment";
import styled from "styled-components";
import { colors, fontWeight, fontSize } from "../../../_foundation";

function Indicator({ totalSeconds, elapsedSeconds, initialSeconds }) {
  const seconds = totalSeconds - elapsedSeconds - initialSeconds;
  const date = moment().startOf("day").seconds(seconds);

  const getText = (date) => {
    const h = date.hour();
    if (h) return date.format("hh : mm : ss");
    else return date.format("mm : ss");
  };

  return <Time>{getText(date)}</Time>;
}

export default Indicator;

const Time = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  font-size: ${fontSize.h1};
  font-weight: ${fontWeight.medium};
  // color: ${colors.gray0};
`;
