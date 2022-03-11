import ReactPlayer from "react-player/lazy";

function LocalVideo({ url }) {
  return (
    <ReactPlayer
      // className="react-player"
      url={url}
      width="100%"
      height="100%"
      // muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
      playing={true}
      loop={true}
      controls={true}
      volume="0.5"
    />
  );
}

export default LocalVideo;
