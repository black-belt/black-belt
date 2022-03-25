import React from "react";
import styled, { css } from "styled-components";
import { colors, fontSize } from "_foundation";
import HoverBtn from "components/atoms/Buttons/hover-btn";

function BottomButtonList() {
  return (
    <>
      <Container>
        <Border></Border>
        <ButtonContainer>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
          <OneButton>
            <HoverBtn onClick={() => {}} text="TaeGeuk 1"></HoverBtn>
          </OneButton>
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
  width: 78%;
  border: 1px solid ${colors.gray7};

  position: absolute;
  left: 50%;
  top: 40px;
  transform: translate(-50%, -50%);
`;
