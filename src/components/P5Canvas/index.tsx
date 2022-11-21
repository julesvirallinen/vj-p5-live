import { Component, FC, useEffect } from "react";
import styled from "styled-components";
import InnerHTML from "dangerously-set-html-content";
import * as SNIPPETS from "./snippets";
import { useCurrentSketchContext } from "../../Providers/currentSketchProvider";
import { useModifyCode } from "../../hooks/useModifyCode";

interface P5CanvasProps {}

const StyledCanvas = styled.div``;

// i'm not sure this can ever be production safe :D very dangerous
export const P5Canvas: FC<P5CanvasProps> = ({ ...rest }) => {
  const { code, sketch, setShouldRecompileAt } = useCurrentSketchContext();

  const shouldRecompile = !!sketch?.shouldRecompileAt;
  const enrichedCode = useModifyCode(code, shouldRecompile);
  useEffect(() => {
    if (shouldRecompile) {
      setShouldRecompileAt(undefined);
    }
  }, [shouldRecompile]);

  const html = `
    <script type="text/javascript"> ${enrichedCode}</script>
    <script>
      ${SNIPPETS.windowResizer}
      ${SNIPPETS.customEase}
      ${SNIPPETS.processingLoggingCompatability}
    </script>
`;

  return (
    <StyledCanvas {...rest}>
      <InnerHTML html={html} />
    </StyledCanvas>
  );
};
