import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./VideoRoomComponent.css";
import { OpenVidu, Subscriber } from "openvidu-browser";
import UserModel from "pages/Gyeorugi/GyeorugiStage/models/user-model";
import OpenViduLayout from "components/molecules/Layout/openvidu-layout";
import DialogExtensionComponent from "components/molecules/DialogExtension/DialogExtension";
import StreamComponent from "components/molecules/Stream/StreamComponent";
import GyeorugiStageTempalte from "components/templates/GyeorugiStageTemplate";

var localUser = new UserModel();

function VideoRoomComponent({
  openviduServerUrl,
  openviduSecret,
  sessionName,
  user,
  token,
  joinSession,
  leaveSession,
}) {
  const OPENVIDU_SERVER_URL = openviduServerUrl
    ? openviduServerUrl
    : "https://" + window.location.hostname + ":4443";
  const OPENVIDU_SERVER_SECRET = openviduSecret ? openviduSecret : "MY_SECRET";
  let hasBeenUpdated = false;
  let layout = new OpenViduLayout();
  let sessionId = sessionName ? sessionName : "SessionA";
  let userName = user ? user : "OpenVidu_User" + Math.floor(Math.random() * 100);
  let remotes = [];
  let localUserAccessAllowed = false;
  const [mySessionId, setMySessionId] = useState(sessionId);
  const [myUserName, setMyUserName] = useState(userName);
  const [session, setSession] = useState(undefined);
  const [myLocalUser, setMyLocalUser] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState("none");
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [messageReceived, setMessageReceived] = useState("");
  const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const [OV, setOV] = useState(undefined);
  let publisher;
  //   let session;

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
      console.log("BB", OV);
      console.log("BB", session);
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
    // session = newOV.initSession();
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
    if (token !== undefined) {
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
    session
      .connect(token, { clientData: myUserName })
      .then(() => {
        console.log("!!!", OV);
        connectWebCam();
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
        alert("There was an error connecting to the session:", error.message);
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
  };

  const connectWebCam = async () => {
    console.log("!!!!", OV);
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
          if (joinSession) {
            joinSession();
          }
        });
      });
    }
    console.log("여기pub", publisher);

    localUser.setNickname(myUserName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
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
    setMySessionId("SessionA");
    setMyUserName("OpenVidu_User" + Math.floor(Math.random() * 100));
    setMyLocalUser(undefined);
    if (leaveSession) leaveSession();
  };

  const camStatusChanged = () => {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    setMyLocalUser(() => localUser);
  };

  const micStatusChanged = () => {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    setMyLocalUser(() => localUser);
  };

  const nicknameChanged = (nickname) => {
    let localUser = myLocalUser;
    localUser.setNickname(nickname);
    setMyLocalUser(() => localUser);
    sendSignalUserChanged({ nickname: myLocalUser.getNickname() });
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
    console.log("여기session", session);
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
      newUser.setNickname(JSON.parse(nickname).clientData);
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

  const toggleFullscreen = () => {
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(localUser.getStreamManager());
          await session.publish(newPublisher);
          myLocalUser.setStreamManager(newPublisher);
          setCurrentVideoDevice(() => newVideoDevice);
          setMyLocalUser(() => localUser);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const screenShare = () => {
    const videoSource = navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          alert("Your browser does not support screen EXTENSION");
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        setMyLocalUser(() => localUser);
      });
      sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
    });
    publisher.on("streamPlaying", () => {
      updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  };

  const closeDialogExtension = () => {
    setShowExtensionDialog(false);
  };

  const stopScreenShare = () => {
    session.unpublish(localUser.getStreamManager());
    connectWebCam();
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

  const checkNotification = (event) => {
    setMessageReceived(chatDisplay === "none");
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

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

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
      />
      {/* <div className="container" id="container">
        <DialogExtensionComponent
          showDialog={showExtensionDialog}
          cancelClicked={closeDialogExtension}
        />
        <div id="layout" className="bounds">
          {newLocalUser !== undefined && newLocalUser.getStreamManager() !== undefined && (
            <div className="OT_root OT_publisher custom-class" id="localUser">
              <StreamComponent user={newLocalUser} />
            </div>
          )}
          {subscribers.map((sub, i) => (
            <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
              <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default VideoRoomComponent;
