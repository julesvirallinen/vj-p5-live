import React, { FC, MutableRefObject } from "react";
import { createPortal } from "react-dom";

interface ICanvasIframeProps {
  children?: React.ReactNode;
}

export const CanvasFrame: FC<
  ICanvasIframeProps & {
    forwardedRef: MutableRefObject<HTMLIFrameElement | null>;
  }
> = ({ children, forwardedRef, ...props }) => {
  const mountNode = forwardedRef?.current?.contentWindow?.document?.body;

  return (
    <iframe
      {...props}
      ref={forwardedRef}
      sandbox="allow-same-origin allow-scripts allow-downloads allow-pointer-lock"
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export const CanvasFrameForwardRef = React.forwardRef<
  HTMLIFrameElement,
  ICanvasIframeProps
>((props, ref) => {
  return (
    <CanvasFrame
      {...props}
      forwardedRef={ref as MutableRefObject<HTMLIFrameElement | null>}
    >
      {props.children}
    </CanvasFrame>
  );
});
CanvasFrameForwardRef.displayName = "CanvasFrameFrowardRef";
