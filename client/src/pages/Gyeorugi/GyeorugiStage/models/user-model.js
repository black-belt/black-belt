class UserModel {
  connectionId;
  audioActive;
  videoActive;
  screenShareActive;
  nickname;
  country;
  streamManager;
  type; // 'remote' | 'local'

  constructor() {
    this.connectionId = "";
    this.audioActive = false;
    this.videoActive = true;
    this.screenShareActive = false;
    this.nickname = "";
    this.country = "";
    this.streamManager = null;
    this.type = "local";
  }

  isAudioActive() {
    return this.audioActive;
  }

  isVideoActive() {
    return this.videoActive;
  }

  isScreenShareActive() {
    return this.screenShareActive;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getCountry() {
    return this.country;
  }

  getStreamManager() {
    return this.streamManager;
  }

  isLocal() {
    return this.type === "local";
  }
  isRemote() {
    return !this.isLocal();
  }
  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive;
  }
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }
  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive;
  }
  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
  }
  setNickname(nickname) {
    this.nickname = nickname;
  }
  setCountry(country) {
    this.country = country;
  }
  setType(type) {
    if ((type === "local") | (type === "remote")) {
      this.type = type;
    }
  }
}

export default UserModel;