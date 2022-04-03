// import { useRecoilValue } from "recoil";
// import { userInfo } from "recoils";
// import { token } from "recoils";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
// import Stomp from "stompjs"

// function StartWS() {
// const user = useRecoilValue(userInfo);
const sock = new SockJs("http://j6a506.p.ssafy.io:8000/ws-stomp");
const stomp = StompJs.over(sock);
// const stompClient: Stomp.Client = Stomp.over(sock)
// stompClient.debug = () => {};

export const StartWS = (userId) => {
  console.log("here?");
  try {
    stomp.connect({}, () => {
      console.log("connected");
      stomp.subscribe(`/sub/api/que/user/${userId}`, (data) => {
        // const newMessage = JSON.parse(data.body);
      });
    });
  } catch (err) {}
  // stomp.onopen = function (event) {
  //   console.log("connected");
  // };
};

export const Invite = (hostId, guestId, token) => {
  const data = {
    type: "INVITE",
    hostId: hostId,
    guestId: guestId,
    token: token,
  };
  stomp.send(`pub/api/que/user/${guestId}`, JSON.stringify(data));
};
// }
// export default StartWS;
