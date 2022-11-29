import React, { FC, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";

import { CanvasFrameForwardRef } from "./components/CanvasIframe";
import { useScriptLoader } from "./useScriptLoader";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
`;

const CanvasIframe = styled(CanvasFrameForwardRef)`
  width: 100%;
  height: 100%;
  border: 0;
  color: black;
  background-color: black;
  color-scheme: none;
`;

const StyledLoading = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const CanvasOpacity = styled.div<{ $opacity: number }>`
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0);
`;

const AnimatedOpacity = animated(CanvasOpacity);

export const P5Canvas: FC = ({ ...rest }) => {
  const canvasRef = useRef<HTMLIFrameElement | null>(null);
  const doc = canvasRef?.current;
  const { loading } = useScriptLoader(doc);
  const {
    canvas: { percentDimmed },
  } = useSettings();
  const [popActive, setPopActive] = useState(true);
  useEffect(() => {
    const popStream = doc?.querySelector("canvas")?.captureStream() as any;
    const popup_html =
      '<!DOCTYPE html><html><head><title>P5LIVE - VISUALS STREAM</title></head><body><div id="but" style="position:fixed;right:5px;top:5px;z-index:10;border:none;color:#fff;padding:5px;font-size:16pt;cursor:pointer;opacity:.5;" onmouseenter="this.style.opacity=1;" onmouseleave="this.style.opacity=.5;" onclick="openFullscreen();" title="Fullscreen">' +
      // icon.maximize +
      '</div><br><video id="vid" playsinline autoplay muted style="position:fixed;left:0;top:0;width:100vw;height:100vh;background-color:#000;"></video><script>var vid=document.getElementById("vid");document.body.style.margin="0";document.body.style.background="' +
      "black" +
      '";function openFullscreen(){if(vid.requestFullscreen) {vid.requestFullscreen(); } else if (vid.mozRequestFullScreen) { /* Firefox */ vid.mozRequestFullScreen();}else if(vid.webkitRequestFullscreen) {/* Chrome, Safari & Opera */ vid.webkitRequestFullscreen();}else if(vid.msRequestFullscreen){/* IE/Edge */ vid.msRequestFullscreen();}}</script><style>::-webkit-media-controls {display:none !important;}</style></body></html>';
    const popup_url = URL.createObjectURL(
      new Blob([popup_html], {
        type: "text/html",
      })
    );
    const p5pop: any = window.open(
      popup_url,
      "P5LIVE - VISUALS STREAM",
      "left=0,top=0,width=0,height=0"
    );
    if (p5pop) {
      p5pop.onload = function () {
        p5pop.vid.srcObject = popStream;
        // let ctrls = p5pop.document.getElementById("controldiv");
        // ctrls.disabled="true";
      };

      const p5popTick = setInterval(function () {
        if (p5pop.closed) {
          setPopActive(false);
          clearInterval(p5popTick);
        }
      }, 500);
    }
  }, [doc]);

  const settingsCaretStyles = useSpring({
    opacity: percentDimmed / 100,
  });

  return (
    <StyledCanvas id={"p5canvas-container"} {...rest}>
      <AnimatedOpacity style={settingsCaretStyles} />
      {loading && <StyledLoading />}
      <CanvasIframe ref={canvasRef}></CanvasIframe>
    </StyledCanvas>
  );
};
