import styled, { css } from "styled-components";
// import { fontSize } from "_foundation";

function PoomsaeCard({ img, clear, onClick, locked }) {
  return (
    <Card>
      <ImageContainer onClick={locked === "Y" ? null : onClick}>
        <Image img={img} locked={locked}></Image>
      </ImageContainer>
      {/* <InfoContainer>
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
      </InfoContainer> */}
    </Card>
  );
}

export default PoomsaeCard;

const Card = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  transition: all 0.35s ease;
  width: 100%;
  height: 85%;
  position: relative;
  text-align: left;
  overflow: hidden;
`;

const Image = styled.div`
  ${(props) =>
    props.locked === "Y"
      ? css`
          background: rgba(0, 0, 0, 0.7);
          filter: grayscale(100%) brightness(50%);
        `
      : css`
          background: rgba(100, 100, 100, 0.7);
          filter: grayscale(0%) brightness(100%);
        `}
  box-sizing: border-box;
  transition: all 0.35s ease;
  backface-visibility: hidden;
  vertical-align: top;
  padding: 20px 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
  background-position: center;
  border-radius: 5px;

  ${ImageContainer}:after & {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

// const InfoContainer = styled.div`
//   height: 25%;
//   display: flex;
//   justify-content: space-between;
// `;

// const Stars = styled.div`
//   padding: 10px 10px 0 0;
//   display: flex;
// `;

// const Star = styled.div`
//   padding-left: 3px;
// `;

// const Title = styled.div`
//   padding: 10px 0 0 5px;
//   font-size: ${fontSize.xl};
// `;
