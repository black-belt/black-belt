// import styled from "styled-components";

// import SmallCarouselItem from "components/atoms/Carousel/SmallCarouselItem";
// import React, { useState } from "react";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// function SmallCarousel({ items, active, setActive }) {
//   const [direction, setDirection] = useState("");

//   const generateItems = () => {
//     let curItems = [];
//     let level;
//     for (let i = active; i < active + 3; i++) {
//       let index = i;
//       if (i < 0) {
//         index = items.length + i;
//       } else if (i >= items.length) {
//         index = i % items.length;
//       }
//       level = active - i;
//       curItems.push(<SmallCarouselItem key={index} id={items[index]} level={level} />);
//     }
//     return curItems;
//   };

//   const moveLeft = () => {
//     let newActive = active;
//     newActive--;
//     setActive(() => {
//       return newActive < 0 ? items.length - 1 : newActive;
//     });
//     setDirection("left");
//   };

//   const moveRight = () => {
//     let newActive = active;
//     setActive(() => {
//       return (newActive + 1) % items.length;
//     });
//     setDirection("right");
//   };

//   return (
//     <Carousel>
//       <ArrowLeft onClick={moveLeft}></ArrowLeft>
//       <ReactCSSTransitionGroup
//         transitionName={direction}
//         // transitionAppear={true}
//         transitionEnterTimeout={100}
//         transitionLeaveTimeout={500}
//       >
//         {generateItems()}
//       </ReactCSSTransitionGroup>
//       <ArrowRight onClick={moveRight}></ArrowRight>
//     </Carousel>
//   );
// }
// export default SmallCarousel;

// const Carousel = styled.div`
//   position: absolute;
//   height: 200px;
//   width: 810px;
//   margin: auto;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;

//   -webkit-user-select: none;
//   -khtml-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// `;

// const Arrow = styled.div`
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   background-color: white;
//   text-align: center;
//   font-size: 25px;
//   border-radius: 50%;
//   cursor: pointer;
//   font-size: 20px;
//   color: #228291;
//   line-height: 30px;
//   margin-top: 85px;
//   z-index: 1000;
// `;

// const ArrowLeft = styled(Arrow)``;

// const ArrowRight = styled(Arrow)`
//   left: 500px;
// `;
