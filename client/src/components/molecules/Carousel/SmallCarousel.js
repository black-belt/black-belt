import styled from "styled-components";
import { colors, fontSize, fontWeight, fontFamily } from "../../../_foundation";
import React, { useState, useRef } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import CustomIcon from "../../atoms/Icons/Icon";
import { useTranslation } from "react-i18next";
import "./SmallCarousel.css";

function SmallCarousel({ items, active, setActive, goToStage }) {
  const [direction, setDirection] = useState("");
  const { t, i18n } = useTranslation();
  // const nodeRef = useRef(null);
  // var ReactCSSTransitionGroup = require("react-addons-css-transition-group");

  const generateItems = () => {
    let curItems = [];
    let level;
    curItems.push(
      <NewItem
        key={active}
        level={0}
        onClick={() => goToStage(active)}
        title={t("language") === "KOR" ? items[active].comboName : items[active].comboNameE}
        score={items[active].comboScore}
      />
    );
    for (let i = active + 1; i < active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      level = active - i;
      curItems.push(
        <NewItem
          key={index}
          level={level}
          onClick={() => {
            setActive(index);
            setDirection("right");
          }}
          title={t("language") === "KOR" ? items[index].comboName : items[index].comboNameE}
          score={items[index].comboScore}
        />
      );
    }
    return curItems;
  };

  const moveLeft = () => {
    let newActive = active;
    newActive--;
    setActive(() => {
      return newActive < 0 ? items.length - 1 : newActive;
    });
    setDirection("left");
  };

  const moveRight = () => {
    let newActive = active;
    setActive(() => {
      return (newActive + 1) % items.length;
    });
    setDirection("right");
  };

  return (
    <Carousel>
      <ArrowLeft onClick={moveLeft}>
        <CustomIcon icon="leftPointer" viewBox="0 0 50 50" width="45" height="45" />
      </ArrowLeft>
      <ArrowRight onClick={moveRight}>
        <CustomIcon icon="rightPointer" viewBox="0 0 50 50" width="45" height="45" />
      </ArrowRight>
      <CardContainer>
        <ReactCSSTransitionGroup
          transitionName={direction}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}
        >
          {items && generateItems()}
        </ReactCSSTransitionGroup>
      </CardContainer>
    </Carousel>
  );
}
export default SmallCarousel;

function NewItem({ level, onClick, title, score }) {
  return (
    <>
      <div className={`item level${level}`} onClick={onClick}>
        <InfoContainer>
          <Title>{title}</Title>
          <Stars>
            <Star>
              <CustomIcon
                icon={score > 0 ? "goldStar" : "blackStar"}
                viewBox="0 0 55 55"
                width="20"
                height="20"
              />
            </Star>
            <Star>
              <CustomIcon
                icon={score > 1 ? "goldStar" : "blackStar"}
                viewBox="0 0 55 55"
                width="20"
                height="20"
              />
            </Star>
            <Star>
              <CustomIcon
                icon={score > 2 ? "goldStar" : "blackStar"}
                viewBox="0 0 55 55"
                width="20"
                height="20"
              />
            </Star>
          </Stars>
        </InfoContainer>
      </div>
    </>
  );
}

const Carousel = styled.div`
  position: absolute;
  /* height: 200px;
  width: 810px;
  margin: auto; */
  left: 50px;
  right: 0;
  /* top: 0;
  bottom: 0;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; */
`;

const Arrow = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 18vh;
  /* background-color: white; */
  /* text-align: center;
  font-size: 25px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  color: #228291;
  line-height: 30px;
  margin-top: 85px;
  z-index: 1000; */
  /* top: 0;
  left: 0; */
`;

const ArrowLeft = styled(Arrow)`
  left: 0;
`;

const ArrowRight = styled(Arrow)`
  left: 60px;
`;

const CardContainer = styled.div`
  position: absolute;
  top: 25vh;
`;

const InfoContainer = styled.div`
  /* height: 100px; */
  display: flex;
  position: relative;
  height: 100%;
  /* bottom: -45px; */
  /* margin-top: 400px; */
  justify-content: space-between;
`;

const Stars = styled.div`
  position: absolute;
  bottom: -40px;
  right: 0;
  padding: 10px 10px 0 0;
  display: flex;
`;

const Star = styled.div`
  padding-left: 3px;
`;

const Title = styled.div`
  position: absolute;
  bottom: -30px;
  padding: 10px 0 0 5px;
  font-size: ${fontSize.xl};
`;
