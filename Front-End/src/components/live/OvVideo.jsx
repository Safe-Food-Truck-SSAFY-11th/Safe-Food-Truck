import React, { useEffect, useRef } from "react";

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;
