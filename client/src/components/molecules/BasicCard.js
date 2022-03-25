import styled, { css } from "styled-components";
import { colors, fontSize, fontWeight, fontFamily } from "../../_foundation";
import CustomIcon from "../atoms/Icons/Icon";

function BasicCard({ title, desc, img, clear, score, locked }) {
  return (
    <Card>
      <ImageContainer>
        <Image img={img} clear={clear}></Image>
        <DescriptionContainer>
          <Description>{desc}</Description>
          <Arrow>
            <CustomIcon icon="inPointer" viewBox="0 0 50 50" width="55" height="55" />
          </Arrow>
        </DescriptionContainer>
      </ImageContainer>
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
    </Card>
  );
}

export default BasicCard;

const Card = styled.div`
  width: 25%;
  height: 40%;
  padding: 20px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  transition: all 0.35s ease;
  width: 100%;
  height: 85%;
  position: relative;
  text-align: left;
  overflow: hidden;

  &:after {
    content: "";
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    opacity: 0;
  }

  &:hover:after {
    border-radius: 5px;
    content: "";
    opacity: 1;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
`;

const Image = styled.div`
  box-sizing: border-box;
  transition: all 0.35s ease;
  backface-visibility: hidden;
  vertical-align: top;
  padding: 20px 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.gray6};
  background-image: url(${(props) => props.img});
  /* background-size: 100% 90%; */
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
  background-position: center;
  ${(props) =>
    !props.clear
      ? css`
          filter: grayscale(0%) brightness(100%);
        `
      : css`
          filter: grayscale(70%) brightness(30%);
        `}
  filter: gray;
  border-radius: 5px;

  ${ImageContainer}:after & {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* ${ImageContainer}:hover & {
    zoom: 1;
    filter: alpha(opacity=50);
    -webkit-opacity: 0.5;
    opacity: 0.5;
  } */
`;

const DescriptionContainer = styled.div`
  color: ${colors.gray0};
  transition: all 0.35s ease;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 1;
  padding: 20%;

  /* &:hover {
    transform: translate(0px, 0px);
    opacity: 1;
  } */

  /* ${ImageContainer}:hover {
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    opacity: 1;
  } */
`;

const Description = styled.div`
  letter-spacing: 1px;
  box-sizing: border-box;
  transition: all 0.35s ease;
  opacity: 0;
  top: 50%;
  transform: translateY(40px);

  /* &:hover {
    transform: translate(0px, 0px);
    opacity: 1;
  } */

  ${ImageContainer}:hover & {
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;

const Arrow = styled.div`
  box-sizing: border-box;
  transition: all 0.35s ease;
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0;
  transform: translateX(-10px);

  /* &:hover {
    transform: translate(0px, 0px);
    opacity: 1;
  } */

  ${ImageContainer}:hover & {
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Stars = styled.div`
  padding: 10px 10px 0 0;
  display: flex;
`;

const Star = styled.div`
  padding-left: 3px;
`;

const Title = styled.div`
  padding: 10px 0 0 5px;
  font-size: ${fontSize.xl};
`;
