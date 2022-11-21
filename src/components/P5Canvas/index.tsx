import { Component, FC } from "react";
import styled from "styled-components";
import InnerHTML from "dangerously-set-html-content";

interface P5CanvasProps {
  code: string;
}

const StyledCanvas = styled.div``;

// i'm not sure this can ever be production safe :D very dangerous
export const P5Canvas: FC<P5CanvasProps> = ({ code, ...rest }) => {
  const html = `
    <script type="text/javascript"> ${code}</script>
    <script>
      function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
      }

      // custom ease function
      function ease(iVal, oVal, eVal){
        return oVal += (iVal - oVal) * eVal;
      }

      // processing compatibility
      function println(msg){
        print(msg);
      }
    </script>
`;

  return (
    <StyledCanvas {...rest}>
      <InnerHTML html={html} />
    </StyledCanvas>
  );
};
