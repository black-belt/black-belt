import CustomIcon from "../Icons/Icon";
import styled, { css } from "styled-components";

function PoomsaeResultSet({ isPassArray }) {
  return (
    <Container>
      <LineContainer>
        <CustomIcon icon="line" viewBox="0 0 360 4" width="360" height="4" />
      </LineContainer>
      {/* <CircleContainer> */}
      <CircleLeft>
        <CustomIcon
          icon={isPassArray[0] ? "circlePass" : "circleFail"}
          viewBox="0 0 50 50"
          width="40"
          height="40"
        />
      </CircleLeft>
      <CircleMiddleLeft>
        <CustomIcon
          icon={isPassArray[1] ? "circlePass" : "circleFail"}
          viewBox="0 0 50 50"
          width="40"
          height="40"
        />
      </CircleMiddleLeft>
      <CircleMiddleRight>
        <CustomIcon
          icon={isPassArray[2] ? "circlePass" : "circleFail"}
          viewBox="0 0 50 50"
          width="40"
          height="40"
        />
      </CircleMiddleRight>
      <CircleRight>
        <CustomIcon
          icon={isPassArray[3] ? "circlePass" : "circleFail"}
          viewBox="0 0 50 50"
          width="40"
          height="40"
        />
      </CircleRight>
      {/* </CircleContainer> */}
    </Container>
  );
}

export default PoomsaeResultSet;

const Container = styled.div`
  position: relative;
  margin-top: 4rem;
  // border: 1px solid #000000;
`;
const LineContainer = styled.div`
  position: absolute;
  left: calc(50% - 180px);
  top: 10px;
`;
const CircleContainer = styled.div`
  position: absolute;
  display: flex;
`;
const CircleLeft = styled.div`
  position: absolute;
  left: calc(50% - 200px);
`;
const CircleMiddleLeft = styled.div`
  position: absolute;
  left: calc(50% - 80px);
`;
const CircleMiddleRight = styled.div`
  position: absolute;
  left: calc(50% + 40px);
`;
const CircleRight = styled.div`
  position: absolute;
  left: calc(50% + 160px);
`;
