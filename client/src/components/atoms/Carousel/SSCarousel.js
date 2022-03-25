// import React from "react";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import "./SSCarousel.css";
// import SmallCarouselItem from "./SmallCarouselItem";

// class SSCarousel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: this.props.items,
//       active: this.props.active,
//       direction: "",
//     };
//     this.rightClick = this.moveRight.bind(this);
//     this.leftClick = this.moveLeft.bind(this);
//   }

//   generateItems() {
//     var items = [];
//     var level;
//     console.log(this.state.active);
//     for (var i = this.state.active; i < this.state.active + 3; i++) {
//       var index = i;
//       if (i < 0) {
//         index = this.state.items.length + i;
//       } else if (i >= this.state.items.length) {
//         index = i % this.state.items.length;
//       }
//       level = this.state.active - i;
//       items.push(<SmallCarouselItem key={index} id={this.state.items[index]} level={level} />);
//     }
//     return items;
//   }

//   moveLeft() {
//     var newActive = this.state.active;
//     newActive--;
//     this.setState({
//       active: newActive < 0 ? this.state.items.length - 1 : newActive,
//       direction: "left",
//     });
//     console.log("left");
//   }

//   moveRight() {
//     var newActive = this.state.active;
//     this.setState({
//       active: (newActive + 1) % this.state.items.length,
//       direction: "right",
//     });
//     console.log("right");
//   }

//   render() {
//     return (
//       <div id="carousel" className="noselect">
//         <div className="arrow arrow-left" onClick={this.leftClick}>
//           <i className="fi-arrow-left"></i>
//         </div>
//         <ReactCSSTransitionGroup
//           transitionName={this.state.direction}
//           // transitionName="example"
//           // transitionAppear={true}
//           transitionEnterTimeout={100}
//           transitionLeaveTimeout={500}
//         >
//           {this.generateItems()}
//         </ReactCSSTransitionGroup>
//         <div className="arrow arrow-right" onClick={this.rightClick}>
//           <i className="fi-arrow-right"></i>
//         </div>
//       </div>
//     );
//   }
// }

// // class Item extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       level: this.props.level,
// //     };
// //   }

// //   render() {
// //     const className = "item level" + this.props.level;
// //     return <div className={className}>{this.props.id}</div>;
// //   }
// // }

// export default SSCarousel;
