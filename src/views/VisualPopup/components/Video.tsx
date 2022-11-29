import React, { useCallback, VideoHTMLAttributes } from "react";

type VideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
};

export const Video = ({ srcObject, ...props }: VideoProps) => {
  const refVideo = useCallback(
    (node: HTMLVideoElement) => {
      if (node) node.srcObject = srcObject;
    },
    [srcObject]
  );

  return <video autoPlay muted ref={refVideo} {...props} />;
};
