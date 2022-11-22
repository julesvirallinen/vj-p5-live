import { FC } from "react";
import styled from "styled-components";
import InnerHTML from "dangerously-set-html-content";
import * as SNIPPETS from "./snippets";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";

interface P5CanvasProps {}

const StyledCanvas = styled.div``;

// i'm not sure this can ever be production safe :D very dangerous
export const P5Canvas: FC<P5CanvasProps> = ({ ...rest }) => {
  const { code } = useCurrentSketch();

  const html = `
    <script type="text/javascript"> ${code}</script>
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
