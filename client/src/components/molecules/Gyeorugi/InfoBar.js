import CountryIcon from "components/atoms/Icons/CountryIcon";
import styled, { css } from "styled-components";
import { colors, fontSize } from "../../../_foundation";

function InfoBar({ left, nickname, country }) {
  return (
    <Container left={left}>
      {left ? (
        <>
          <CountryIcon icon={country} />
          <Nickname>{nickname}</Nickname>
        </>
      ) : (
        <>
          <Nickname>{nickname}</Nickname>
          <CountryIcon icon={country} />
        </>
      )}
    </Container>
  );
}
export default InfoBar;

const Container = styled.div`
  height: 40px;
  width: 80%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 115px;
  ${(props) =>
    props.left
      ? css`
          padding-left: 10px;
          background: linear-gradient(90deg, #495057 0%, rgba(73, 80, 87, 0) 68.62%);
          left: 0;
        `
      : css`
          padding-right: 10px;
          background: linear-gradient(90deg, rgba(73, 80, 87, 0) 31.4%, #495057 100%);
          justify-content: flex-end;
          right: 0;
        `}
`;

const Nickname = styled.div`
  color: ${colors.gray0};
  font-size: 1.8rem;
  font-family: Dokdo;
  padding: 0 10px;
`;
