import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import * as SNIPPETS from "./snippets";

export const useSketchCodeManager = () => {
  const { codeToCompile } = useCurrentSketch();

  const html = `


    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}

    ${codeToCompile}
    

`;

  return html;
};
