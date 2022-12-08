import React, { useEffect, useRef,VideoHTMLAttributes } from "react";

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
};

export const Video = ({ srcObject, ...props }: PropsType) => {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!refVideo.current || !srcObject) return;
    refVideo.current.srcObject = srcObject;
  }, [srcObject, refVideo]);

  return <video autoPlay muted ref={refVideo} {...props} />;
};
