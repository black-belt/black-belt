import styled from "styled-components";
import { colors } from "../../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../../_foundation/typography";

function PartStage({ partArray, curIdx }) {
  return (
    <Container>
      {partArray.map((desc, index) =>
        index === curIdx ? <CurPart key={index}>{desc}</CurPart> : <Part key={index}>{desc}</Part>
      )}
    </Container>
  );
}

export default PartStage;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-family: ${fontFamily.sans};
  color: ${colors.gray0};
  margin-left: 100px;
`;

const Part = styled.div`
  font-size: ${fontSize.h3};
  font-weight: ${fontWeight.medium};
  margin: 10px 20px 10px 0;
`;

const CurPart = styled.div`
  font-size: ${fontSize.h2};
  font-weight: ${fontWeight.bold};
  color: ${colors.blue0};
  margin: 0 20px 0 0;
`;
