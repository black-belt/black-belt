// import { useRecoilValue } from "recoil";
// import { userInfo } from "recoils";
// import { token } from "recoils";
import SockJs from "sockjs-client";
import StompJs from "stompjs";

const sock = new SockJs("https://j6a506.p.ssafy.io/stomp/");
const stomp = StompJs.over(sock);

let Msg = [];
const recvMsg = () => {};

export const StartWS = (userId) => {
  console.log("here?");
  try {
    stomp.connect({}, () => {
      console.log("connected");
      stomp.subscribe(`/sub/api/que/user/${userId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        console.log(newMessage);
      });
    });
  } catch (err) {}
  // stomp.onopen = function (event) {
  //   console.log("connected");
  // };
};

export const Invite = (props) => {
  const data = {
    type: "INVITE",
    hostId: props.hostId,
    guestId: props.guestId,
    token: props.token,
  };
  stomp.send(`pub/api/que/user/${props.guestId}`, JSON.stringify(data));
};
