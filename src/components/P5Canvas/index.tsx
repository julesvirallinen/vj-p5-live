import React, { FC, useEffect } from "react";
import styled from "styled-components";
import InnerHTML from "dangerously-set-html-content";
import * as SNIPPETS from "./snippets";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import CustomIframe from "./components/CanvasIframe";
import {
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../../Providers/SettingsProvider";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
`;

const CanvasIframe = styled(CustomIframe)`
  width: 100%;
  height: 100%;
  border: 0;
  color: black;
  background-color: black;
  color-scheme: none;
`;

export const P5Canvas: FC = ({ ...rest }) => {
  const { codeToCompile, id } = useCurrentSketch();
  const {
    internal: { lastHardCompiledAt },
  } = useSettingsStateContext();
  const dispatch = useSettingsDispatchContext();

  useEffect(() => {
    setTimeout(
      () =>
        dispatch({
          type: "resetCanvasKey",
        }),
      1000
    );
  }, [id]);

  const html = `
  <script type="text/javascript"> ${codeToCompile}</script>
  <script>
    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}


    
  </script>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>

`;

  return (
    <StyledCanvas id={"p5canvas-container"} {...rest}>
      <CanvasIframe content={html} key={`${lastHardCompiledAt}`}>
        <InnerHTML html={html} />
      </CanvasIframe>
    </StyledCanvas>
  );
};
