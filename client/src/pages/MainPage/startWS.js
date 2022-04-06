import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { useNavigate } from "react-router-dom";

const sock = new SockJs("http://localhost:8000/ws-stomp/");
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
        // return newMessage;
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
  stomp.send("/pub/api/que/user", {}, JSON.stringify(data));
  navigate("/gyeorugi/normal");
};

export const Accept = (props) => {
  const navigate = useNavigate();
  const data = {
    type: "ACCEPT",
    hostId: props.hostId,
    guestId: props.guestId,
  };
  stomp.send("/pub/api/que/user", {}, JSON.stringify(data));
  navigate("/gyeorugi/normal");
};
