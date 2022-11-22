import React, { FC } from "react";
import styled from "styled-components";
import InnerHTML from "dangerously-set-html-content";
import * as SNIPPETS from "./snippets";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import CustomIframe from "./components/CustomIframe";

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

// i'm not sure this can ever be production safe :D very dangerous
// The optimal would probably be having this be in a iframe or other isolated environment
// Clean namespace also bonus
export const P5Canvas: FC = ({ ...rest }) => {
  const { codeToCompile } = useCurrentSketch();

  const html = `
  <script type="text/javascript"> ${codeToCompile}</script>
  <script>
    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}


    
  </script>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>

`;

  return (
    <StyledCanvas id={"p5canvas-container"} {...rest}>
      <CanvasIframe content={html}>
        <InnerHTML html={html} />
      </CanvasIframe>
    </StyledCanvas>
  );
};
