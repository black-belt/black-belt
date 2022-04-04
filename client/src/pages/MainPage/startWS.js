import { SmokingRooms } from "@material-ui/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gyeorugiMsg, message } from "recoils";
import SockJs from "sockjs-client";
import StompJs from "stompjs";

const sock = new SockJs("https://j6a506.p.ssafy.io/stomp/");
const stomp = StompJs.over(sock);

export const StartWS = (userId) => {
  // const msg = useSetRecoilState(message);
  // const test = useRecoilValue(gyeorugiMsg);
  try {
    stomp.connect({}, () => {
      stomp.subscribe(`/sub/api/que/user/${userId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        // msg(newMessage);
        // console.log(test);
        return newMessage;
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
    guestId: Number(props.guestId),
    token: props.token,
  };
  stomp.send("/pub/api/que/user", {}, JSON.stringify(data));
};
