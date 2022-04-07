import styled from "styled-components";
import { colors } from "../../../_foundation/colors";
import { fontFamily, fontSize, fontWeight } from "../../../_foundation/typography";

function DescStage({ descArray, curIdx }) {
  return (
    <Container>
      {descArray.map((desc, index) =>
        index === Number(curIdx) ? (
          <CurDesc key={index}>{desc}</CurDesc>
        ) : (
          <Desc key={index}>{desc}</Desc>
        )
      )}
    </Container>
  );
}

export default DescStage;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-family: ${fontFamily.sans};
  color: ${colors.gray0};
`;

const Desc = styled.div`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.regular};
  margin: 10px 20px 10px 0;
`;

const CurDesc = styled.div`
  font-size: ${fontSize.h3};
  font-weight: ${fontWeight.medium};
  color: ${colors.star};
  margin: 0 20px 0 0;
`;
