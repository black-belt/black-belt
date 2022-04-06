import ReactPlayer from "react-player/lazy";
import "./LocalVideo.css";

function LocalVideo({ url }) {
  return (
    <ReactPlayer
      className="local-video"
      url={url}
      // width="90%"
      // height="100%"
      width="39.2vw"
      height="25vw"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "60px",
        // borderRadius: "10px",
      }}
      muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
      playing={true}
      loop={true}
      controls={true}
    />
  );
}

export default LocalVideo;
