import styled from "styled-components";
// import "./SmallCarouselItem.css";

function SmallCarouselItem({ level, id }) {
  return (
    <>
      {level === 0 && <Item0>{id}</Item0>}
      {level === -1 && <Item1>{id}</Item1>}
      {level === -2 && <Item2>{id}</Item2>}
    </>
  );
}
export default SmallCarouselItem;

const Item = styled.div`
  text-align: center;
  color: white;
  font-size: 40px;
  position: absolute;
  transition: height 1s, width 1s, left 1s, margin-top 1s, line-height 1s, background-color 1s;
`;

const Item0 = styled(Item)`
  height: 200px;
  width: 150px;
  line-height: 200px;
  background-color: #4ec9e1;
  left: 50px;
`;

const Item1 = styled(Item)`
  height: 180px;
  width: 130px;
  line-height: 180px;
  background-color: #6796e5;
  left: 210px;
  margin-top: 10px;
`;

const Item2 = styled(Item)`
  height: 150px;
  width: 110px;
  line-height: 150px;
  background-color: #000000;
  left: 350px;
  margin-top: 25px;
`;
