import { FC } from "react";
import styled from "styled-components";
import InnerHTML from "dangerously-set-html-content";
import * as SNIPPETS from "./snippets";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";

const StyledCanvas = styled.div``;

// i'm not sure this can ever be production safe :D very dangerous
// The optimal would probably be having this be in a iframe or other isolated environment
// Clean namespace also bonus
export const P5Canvas: FC = ({ ...rest }) => {
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
