import CountryIcon from "components/atoms/Icons/CountryIcon";
import styled, { css } from "styled-components";
import { colors } from "_foundation";

function VSTemplate({ red, blue }) {
  return (
    <>
      <VS>VS</VS>
      <Gradient />
      <InfoRed>
        <InfoContainer red>
          <TierImg
            red
            src={`/images/tier/${red.tierNameE ? red.tierNameE : "bronze"}.png`}
            alt=""
          />
          <CountryIcon
            icon={red.countryName ? red.countryName : "korea"}
            width="100px"
            height="100px"
          />
          <Text>{red.userNick}</Text>
        </InfoContainer>
        {/* red.country */}
      </InfoRed>
      {/* <RecordRed></RecordRed> */}
      <RedProfile>
        <BackgroundProfileRed
          src={red.userProfilePath ? red.userProfilePath : "/images/gyeorugiNormalBackground.png"}
        />
      </RedProfile>
      <InfoBlue>
        <InfoContainer blue>
          <TierImg src={`/images/tier/${blue.tierNameE ? blue.tierNameE : "bronze"}.png`} alt="" />
          <TempContainer>
            <CountryIcon
              icon={blue.countryName ? blue.countryName : "korea"}
              width="100px"
              height="100px"
            />
            <Text>{blue.userNick}</Text>
          </TempContainer>
        </InfoContainer>
      </InfoBlue>
      {/* <RecordBlue></RecordBlue> */}
      <BlueProfile>
        <BackgroundProfileBlue
          src={blue.userProfilePath ? blue.userProfilePath : "/images/gyeorugiNormalBackground.png"}
        />
      </BlueProfile>
    </>
  );
}

export default VSTemplate;

const VS = styled.div`
  font-size: 11rem;
  color: ${colors.gray0};
  font-family: Dry Brush;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Gradient = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    25.49% 694.1% at 50.9% 100%,
    #000000 0%,
    rgba(0, 0, 0, 0) 75.37%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 0;
`;

const RedProfile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  /* background-color: red; */
  transform: skewX(20deg) translateX(-370px);
  overflow: hidden;
  z-index: -5;
`;

const BackgroundProfileRed = styled.img`
  /* content: ""; */
  /* padding: 50px 80px; */
  width: 100%;
  height: 100%;
  position: absolute;
  /* position: absolute;
  top: 0;
  left: 0;*/
  transform: skewX(-20deg) translateX(250px);
  object-fit: cover;
  /* background: linear-gradient(to right, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 1) 80%); */
  /* url(${(props) => props.imgSrc}); */
`;

const BlueProfile = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  /* padding: 50px 80px 0 62%; */
  /* background-color: #616161; */
  overflow: hidden;
`;

const BackgroundProfileBlue = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0;
  right: 0;
  object-fit: cover;
  transform: translateX(50px);
  z-index: -10;
`;

const InfoRed = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 761px;
  height: 229px;
  border-radius: 10px;
  background: linear-gradient(90deg, #b20828 0%, rgba(73, 80, 87, 0) 68%);
  padding-top: 20px;
  /* transform: matrix(1, 0, 0, -1, 0, 0); */
`;

const InfoBlue = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 761px;
  height: 229px;
  background: linear-gradient(90deg, rgba(73, 80, 87, 0) 32%, #004c8d 100%);
  border-radius: 10px;
  padding-top: 20px;
  /* transform: rotate(-180deg); */
`;

const InfoContainer = styled.div`
  position: relative;
  display: flex;
  width: inherit;
  height: inherit;
  ${(props) =>
    props.red
      ? css`
          padding-left: 20px;
          flex-direction: column;
        `
      : css`
          padding-right: 20px;
          flex-direction: row-reverse;
        `};
`;

const TierImg = styled.img`
  filter: grayscale(100%) brightness(80%);
  position: absolute;
  ${(props) =>
    props.red
      ? css`
          left: 18%;
        `
      : css`
          right: 18%;
        `};
  height: 85%;
  z-index: -1;
  /* padding: 2rem; */
`;

const Text = styled.div`
  font-size: 3.7rem;
  font-family: Dokdo;
  color: ${colors.gray0};
  padding: 20px 10px 0 10px;
`;

const TempContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RecordRed = styled.div`
  position: absolute;
  width: 761px;
  height: 84px;

  bottom: 50px;
  left: 50px;

  background: linear-gradient(90deg, #f8f9fa 0%, rgba(73, 80, 87, 0) 68%);
  border-radius: 10px;
`;

const RecordBlue = styled.div`
  position: absolute;
  width: 761px;
  height: 84px;

  bottom: 50px;
  right: 50px;

  background: linear-gradient(90deg, rgba(73, 80, 87, 0) 32%, #f8f9fa 100%);
  border-radius: 10px;
`;
