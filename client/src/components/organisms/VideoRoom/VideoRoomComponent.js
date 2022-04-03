import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VideoRoomComponent.css";
import { OpenVidu, Subscriber } from "openvidu-browser";
import UserModel from "pages/Gyeorugi/GyeorugiStage/models/user-model";
import OpenViduLayout from "components/molecules/Layout/openvidu-layout";
import DialogExtensionComponent from "components/molecules/DialogExtension/DialogExtension";
import GyeorugiStageTempalte from "components/templates/GyeorugiStageTemplate";

var localUser = new UserModel();

function VideoRoomComponent({
  // openviduServerUrl, //X
  // openviduSecret, //X
  // sessionName, //X
  // user, //X
  // country, //X
  // joinSession, //X
  // leaveSession, //X
  setResult,
  setIsWin,
  info,
  token,
  otherNick,
}) {
  // const OPENVIDU_SERVER_URL = openviduServerUrl
  //   ? openviduServerUrl
  //   : "https://" + window.location.hostname + ":4443";
  // const OPENVIDU_SERVER_SECRET = openviduSecret ? openviduSecret : "MY_SECRET";
  let hasBeenUpdated = false;
  let layout = new OpenViduLayout();
  // let sessionId = sessionName ? sessionName : "SessionTE";
  let userName = info.userNick ? info.userNick : "OpenVidu_User" + Math.floor(Math.random() * 100);
  let userCountry = info.countryName ? info.countryName : "korea";
  let remotes = [];
  let localUserAccessAllowed = false;
  // const [mySessionId, setMySessionId] = useState(sessionId);
  const [myUserName, setMyUserName] = useState(userName);
  const [myCountry, setMyCountry] = useState(userCountry);
  const [session, setSession] = useState(undefined);
  const [myLocalUser, setMyLocalUser] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState("none");
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [messageReceived, setMessageReceived] = useState("");
  const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const [OV, setOV] = useState(undefined);
  const [isTimer, setIsTimer] = useState(false);
  const [ready, setReady] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [leftPercent, setLeftPercent] = useState(1000);
  const [rightPercent, setRightPercent] = useState(1000);
  const [myAttack, setMyAttack] = useState(0);
  const [otherAttack, setOtherAttack] = useState(0);
  const [myDefence, setMyDefence] = useState(0);
  const [otherDefence, setOtherDefence] = useState(0);
  const answerAttack = ["Inward Punch"];
  const answerDefence = ["Inward Block"];
  const damages = {
    1: 100, //상단발차기
    2: 60, //중단발차기
    3: 30, //하단발차기
    11: 70, //상단주먹
    12: 50, //중단주먹
    "Inward Punch": 500,
  };
  let publisher;
  let myHP = 1000;
  let otherHP = 1000;

  useEffect(() => {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    layout.initLayoutContainer(document.getElementById("layout"), openViduLayoutOptions);
    window.addEventListener("beforeunload", onbeforeunload);
    window.addEventListener("resize", updateLayout);
    window.addEventListener("resize", checkSize);
    myJoinSession();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("resize", checkSize);
      // console.log("BB", OV);
      // console.log("BB", session);
      myLeaveSession();
    };
  }, []);

  const onbeforeunload = (event) => {
    myLeaveSession();
  };

  const myJoinSession = () => {
    let newOV = new OpenVidu();
    setOV((current) => {
      return newOV;
    });
    setSession((current) => {
      return newOV.initSession();
    });
  };

  useEffect(() => {
    if (session !== undefined && OV !== undefined) {
      console.log("session useEffect");
      subscribeToStreamCreated();
      connectToSession();
    }
  }, [session, OV]);

  const connectToSession = () => {
    //state.token
    console.log("token!!", token);
    if (token) {
      console.log("token received: ", token);
      connect(token);
    } else {
      getToken()
        .then((token) => {
          console.log(token);
          connect(token);
        })
        .catch((error) => {
          if (error) {
            error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log("There was an error getting the token:", error.code, error.message);
          alert("There was an error getting the token:", error.message);
        });
    }
  };

  const connect = (token) => {
    console.log("!!connect", session);
    session
      .connect(token, { clientData: myUserName, country: myCountry })
      .then(() => {
        console.log("!!!then", OV);
        connectWebCam();
      })
      .catch((error) => {
        console.log("!!error");
        if (error) {
          error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
  };

  const connectWebCam = async () => {
    var devices = await OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        session.publish(publisher).then(() => {
          updateSubscribers();
          localUserAccessAllowed = true;
          // if (joinSession) {
          //   joinSession();
          // }
        });
      });
    }

    //state.name
    localUser.setNickname(myUserName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    //state.country
    localUser.setCountry(myCountry);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    subscribeToReady();
    subscribeToAttack();
    subscribeToDefence();
    subscribeToHp();
    subscribeToDamage();
    subscribeToStart();
    sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

    setCurrentVideoDevice(() => videoDevices[0]);
    setMyLocalUser(() => localUser);
  };

  useEffect(() => {
    if (myLocalUser !== undefined && currentVideoDevice !== undefined) {
      myLocalUser.getStreamManager().on("streamPlaying", (e) => {
        updateLayout();
        publisher.videos[0].video.parentElement.classList.remove("custom-class");
      });
    }
  }, [myLocalUser, currentVideoDevice]);

  let isUpdateSubscribers = false;
  let isSubscribeToUserChanged = false;

  const updateSubscribers = () => {
    var subscribers = remotes;
    isUpdateSubscribers = true;
    setSubscribers(() => subscribers);
  };

  useEffect(() => {
    if (isUpdateSubscribers) {
      isUpdateSubscribers = false;
      if (myLocalUser) {
        sendSignalUserChanged({
          isAudioActive: myLocalUser.isAudioActive(),
          isVideoActive: myLocalUser.isVideoActive(),
          nickname: myLocalUser.getNickname(),
          country: myLocalUser.getCountry(),
          isScreenShareActive: myLocalUser.isScreenShareActive(),
        });
      }
      updateLayout();
    }
    if (isSubscribeToUserChanged) {
      isSubscribeToUserChanged = false;
      checkSomeoneShareScreen();
    }
  }, [subscribers]);

  const myLeaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // setOV(null);
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    // setMySessionId("SessionA");
    setMyUserName("OpenVidu_User" + Math.floor(Math.random() * 100));
    setMyCountry("korea");
    setMyLocalUser(undefined);
    // if (leaveSession) leaveSession();
  };

  const deleteSubscriber = (stream) => {
    const remoteUsers = subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      setSubscribers(() => remoteUsers);
    }
  };

  const subscribeToStreamCreated = () => {
    // console.log("여기session", session);
    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove("custom-class");
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      // console.log("여기!!", event.stream.connection.data.split("%")[0]);
      newUser.setNickname(JSON.parse(nickname).clientData);
      newUser.setCountry(JSON.parse(nickname).country);
      remotes.push(newUser);
      if (localUserAccessAllowed) {
        updateSubscribers();
      }
    });
  };

  const subscribeToStreamDestroyed = () => {
    // On every Stream destroyed...
    session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream);
      setTimeout(() => {
        checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      updateLayout();
    });
  };

  const subscribeToUserChanged = () => {
    session.on("signal:userChanged", (event) => {
      let remoteUsers = subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.country !== undefined) {
            user.setCountry(data.country);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      isSubscribeToUserChanged = true;
      setSubscribers(() => {
        return remoteUsers;
      });
    });
  };

  const updateLayout = () => {
    setTimeout(() => {
      layout.updateLayout();
    }, 20);
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    session.signal(signalOptions);
  };

  const closeDialogExtension = () => {
    setShowExtensionDialog(false);
  };

  const checkSomeoneShareScreen = () => {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    layout.setLayoutOptions(openviduLayoutOptions);
    updateLayout();
  };

  const toggleChat = (property) => {
    let display = property;

    if (display === undefined) {
      display = chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      setChatDisplay(display);
      setMessageReceived(false);
    } else {
      console.log("chat", display);
      setChatDisplay(display);
    }
    updateLayout();
  };

  const checkSize = () => {
    if (document.getElementById("layout").offsetWidth <= 700 && !hasBeenUpdated) {
      toggleChat("none");
      hasBeenUpdated = true;
    }
    if (document.getElementById("layout").offsetWidth > 700 && hasBeenUpdated) {
      hasBeenUpdated = false;
    }
  };

  const getToken = async () => {
    // return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  };

  // const createSession = (sessionId) => {
  //   return new Promise((resolve, reject) => {
  //     var data = JSON.stringify({ customSessionId: sessionId });
  //     axios
  //       .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
  //         headers: {
  //           Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         console.log("CREATE SESION", response);
  //         resolve(response.data.id);
  //       })
  //       .catch((response) => {
  //         var error = Object.assign({}, response);
  //         if (error.response && error.response.status === 409) {
  //           resolve(sessionId);
  //         } else {
  //           console.log(error);
  //           console.warn(
  //             "No connection to OpenVidu Server. This may be a certificate error at " +
  //               OPENVIDU_SERVER_URL
  //           );
  //           if (
  //             window.confirm(
  //               'No connection to OpenVidu Server. This may be a certificate error at "' +
  //                 OPENVIDU_SERVER_URL +
  //                 '"\n\nClick OK to navigate and accept it. ' +
  //                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
  //                 OPENVIDU_SERVER_URL +
  //                 '"'
  //             )
  //           ) {
  //             window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
  //           }
  //         }
  //       });
  //   });
  // };

  // const createToken = (sessionId) => {
  //   return new Promise((resolve, reject) => {
  //     var data = JSON.stringify({});
  //     axios
  //       .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
  //         headers: {
  //           Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         console.log("TOKEN", response);
  //         resolve(response.data.token);
  //       })
  //       .catch((error) => reject(error));
  //   });
  // };

  const sendSignalReady = () => {
    console.log("!!내준비");
    session.signal({
      data: JSON.stringify({
        streamId: localUser.getStreamManager().stream.streamId,
      }),
      type: "ready",
    });
  };

  const subscribeToReady = () => {
    session.on("signal:ready", (event) => {
      const streamId = JSON.parse(event.data).streamId;
      console.log(streamId, localUser.getStreamManager().stream.streamId);
      if (streamId !== localUser.getStreamManager().stream.streamId) {
        console.log("!!상대 준비");
        setReady((current) => current + 1);
      }
    });
  };

  const sendSignalStart = () => {
    console.log("!!시작보냄");
    session.signal({
      data: JSON.stringify({
        streamId: localUser.getStreamManager().stream.streamId,
      }),
      type: "start",
    });
  };

  const subscribeToStart = () => {
    session.on("signal:start", (event) => {
      const streamId = JSON.parse(event.data).streamId;
      console.log(streamId, localUser.getStreamManager().stream.streamId);
      if (streamId !== localUser.getStreamManager().stream.streamId) {
        console.log("!!상대 시작");
        start();
      }
    });
  };

  const sendSignalHp = (hp) => {
    session.signal({
      data: JSON.stringify({
        streamId: localUser.getStreamManager().stream.streamId,
        hp: hp,
      }),
      type: "hp",
    });
  };

  const subscribeToHp = () => {
    session.on("signal:hp", (event) => {
      const hp = JSON.parse(event.data).hp;
      const streamId = JSON.parse(event.data).streamId;
      if (streamId !== localUser.getStreamManager().stream.streamId) {
        console.log("!!상대 HP", hp);
        otherHP = hp;
        setRightPercent((current) => hp);
      }
    });
  };

  const sendSignalDamage = (damage) => {
    console.log("데미지!!", damage);
    session.signal({
      data: JSON.stringify({
        streamId: localUser.getStreamManager().stream.streamId,
        damage: damage,
      }),
      type: "damage",
    });
  };

  const subscribeToDamage = () => {
    session.on("signal:damage", (event) => {
      const damage = JSON.parse(event.data).damage;
      const streamId = JSON.parse(event.data).streamId;
      if (streamId !== localUser.getStreamManager().stream.streamId) {
        console.log("!!상대 Damage", damage);
        setOtherAttack(() => damage);
        const clearOtherAttack = setInterval(() => {
          setOtherAttack(0);
          clearInterval(clearOtherAttack);
        }, 1000);
      }
    });
  };

  const sendSignalAttack = (attackType) => {
    console.log("공격함!!", attackType);
    session.signal({
      data: JSON.stringify({
        streamId: localUser.getStreamManager().stream.streamId,
        attackType: attackType,
      }),
      type: "attack",
    });
  };

  const subscribeToAttack = () => {
    session.on("signal:attack", (event) => {
      const streamId = JSON.parse(event.data).streamId;
      if (streamId !== localUser.getStreamManager().stream.streamId) {
        console.log("!!상대 공격");
        const attackType = JSON.parse(event.data).attackType;
        let damage = damages[attackType];
        if (myDefence !== 0) {
          //myDefence === attackType % 10
          //방어성공
          damage = Math.floor(damage * 0.3);
        }
        // setOtherAttack((current) => attackType);
        myHP -= damage;
        sendSignalHp(myHP);
        sendSignalDamage(damage);
        setLeftPercent(myHP);
        setMyAttack(damage);
        const clearAttack = setInterval(() => {
          setMyAttack(0);
          clearInterval(clearAttack);
        }, 1000);
        console.log("!!내HP", leftPercent);
      }
    });
  };

  const sendSignalDefence = (defenceType) => {
    console.log("방어함!!", defenceType);
    session.signal({
      data: JSON.stringify({
        streamId: localUser.getStreamManager().stream.streamId,
        defenceType: defenceType,
      }),
      type: "defence",
    });
  };

  const subscribeToDefence = () => {
    session.on("signal:defence", (event) => {
      const defenceType = JSON.parse(event.data).defenceType;
      const streamId = JSON.parse(event.data).streamId;
      if (streamId !== localUser.getStreamManager().stream.streamId) {
        console.log("!!상대 방어");
        setOtherDefence(() => defenceType);
      }
    });
  };

  const attack = (attackType) => {
    sendSignalAttack(attackType);
    setMyDefence(() => 0);
    sendSignalDefence(0);
    // setMyAttack(() => attackType);
  };

  const defence = (defenceType) => {
    sendSignalDefence(defenceType);
    setMyDefence(() => defenceType);
  };

  const reset = () => {
    setMyDefence(() => 0);
    sendSignalDefence(0);
  };

  useEffect(() => {
    if (ready === 2) {
      start();
    }
  }, [ready]);

  const startMe = () => {
    setReady((current) => current + 1);
    sendSignalReady();
  };

  const start = () => {
    if (!isTimer) {
      sendSignalStart();
      setIsTimer(true);
    }
  };

  const end = () => {
    setIsEnd(true);
  };

  useEffect(() => {
    if (isEnd) {
      let result = false;
      if (leftPercent === rightPercent) {
        if (myUserName > otherNick) {
          result = true;
        }
      } else if (leftPercent > rightPercent) {
        result = true;
      }
      console.log("!!결과", leftPercent, rightPercent);
      setIsWin(result);
      setResult((current) => current + 1);
    }
  }, [isEnd]);

  // useEffect(() => {
  //   if (isEnd && result === 1) {
  //     const data = axiosInstance.post
  //   }
  // }, [isEnd, result]);

  const newLocalUser = myLocalUser;

  return (
    <>
      <GyeorugiStageTempalte
        dialog={
          <DialogExtensionComponent
            showDialog={showExtensionDialog}
            cancelClicked={closeDialogExtension}
          />
        }
        localUser={newLocalUser}
        subscribers={subscribers}
        guide={"상대방에 대한 예의를 갖추고 인사를 하면 겨루기가 시작됩니다."}
        isTimer={isTimer}
        setIsTimer={setIsTimer}
        leftPercent={leftPercent}
        rightPercent={rightPercent}
        answerAttack={answerAttack}
        answerDefence={answerDefence}
        isEnd={isEnd}
        isStart={isTimer}
        start={startMe}
        attack={attack}
        defence={defence}
        end={end}
        reset={reset}
        myDefence={myDefence}
        otherDefence={otherDefence}
        myAttack={myAttack}
        otherAttack={otherAttack}
      />
    </>
  );
}

export default VideoRoomComponent;
