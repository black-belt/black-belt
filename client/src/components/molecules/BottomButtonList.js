import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";
import DotButton from "components/atoms/Buttons/dot-btn";

function BottomButtonList({ buttons, selectedPoomsaeIdx, changePoomsae }) {
  return (
    <>
      <Container>
        <Border></Border>
        <ButtonContainer>
          {buttons.map((value, index) => (
            <OneButton key={index}>
              <DotButton
                onClick={() => {
                  changePoomsae(index);
                }}
                text={value}
                isActive={index === selectedPoomsaeIdx}
              ></DotButton>
            </OneButton>
          ))}
        </ButtonContainer>
      </Container>
    </>
  );
}
export default BottomButtonList;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 40px;
  width: 85%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translate(-50%, -50%);
`;

const OneButton = styled.div`
  width: 150px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Border = styled.div`
  width: calc(85% - 90px);
  border: 1px solid ${colors.gray7};

  position: absolute;
  left: 50%;
  top: 40px;
  transform: translate(-50%, -50%);
`;
