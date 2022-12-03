import React, { FC, MutableRefObject, useEffect } from "react";
import { createPortal } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useGlobalCommands } from "../../../hooks/useGlobalCommands";

interface ICanvasIframeProps {
  children?: React.ReactNode;
}

export const CanvasFrame: FC<
  ICanvasIframeProps & {
    forwardedRef: MutableRefObject<HTMLIFrameElement | null>;
  }
> = ({ children, forwardedRef, ...props }) => {
  const mountNode = forwardedRef?.current?.contentWindow?.document?.body;

  useEffect(() => {
    if (!mountNode) return;
    mountNode.style.margin = "0";
  }, [mountNode]);

  const { iframeKey } = useGlobalCommands();
  return (
    <iframe
      key={iframeKey}
      ref={forwardedRef}
      sandbox="allow-same-origin allow-scripts allow-downloads allow-pointer-lock"
      {...props}
    >
      <ErrorBoundary
        fallbackRender={(asdf) => <>{asdf.resetErrorBoundary}</>}
        onError={(error) =>
          console.log(error, "background: #222; color: #bada55")
        }
      >
        {mountNode && createPortal(children, mountNode)}
      </ErrorBoundary>
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
