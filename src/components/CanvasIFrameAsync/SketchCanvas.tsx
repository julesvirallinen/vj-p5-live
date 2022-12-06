import React, { Component, RefObject } from "react";
import styled from "styled-components";
import { ALWAYS_LOADED_SCRIPTS } from "../../defs/Scripts";
import { TSrcScript } from "../../models/script";
import { loadProcessingScripts, loadScript } from "../P5Canvas/lib/loadScripts";
import { compileScriptList, extractUserScripts } from "./libs/extractScripts";
import Logger from "js-logger";
import { TCanvasWindowProps } from "../../models/canvas";
import { formatUserCode } from "./libs/formatUserCode";

const StyledSketchCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: black;
`;

const StyledIframe = styled.iframe`
  width: 100vw;
  height: 100vh;
  border: 0;
  background-color: black;
  color-scheme: none;
`;

export interface ISketchCanvasProps {
  userPersistedScripts: TSrcScript[];
  sketchCode: string;
  sketchId: string;
  setRecompileSketch: (any) => void;
  setCanvasMediaStream: (any) => void;
  setSketchLoaded: () => void;
  key: number;
}

export interface ISketchCanvasState {
  iframeRef: RefObject<HTMLIFrameElement>;
  scriptsLoaded: number;
  loadingState: TLoadingState;

  recompileSketch?: () => void;
  sketchId: string;
  renderedCode: string;
}

type TLoadingState =
  | "not_started"
  | "started"
  | "scriptsLoaded"
  | "userCodeLoaded";

const getIframeDocumentAndWindow = (state: ISketchCanvasState) => {
  const document = state.iframeRef?.current?.contentWindow
    ?.document as Document;
  const contentWindow = state.iframeRef.current?.contentWindow as Window &
    TCanvasWindowProps;

  return { document, contentWindow };
};

/**
 * The design idea was only to use modern FC / hook code, but I realized that the useEffect hell that ensued isn't quite suitable for the script
 * chaos that this app requires. So the canvas things will be partly class-react
 */
class SketchCanvas extends Component<ISketchCanvasProps, ISketchCanvasState> {
  constructor(props: ISketchCanvasProps) {
    super(props);
    const iframeRef = React.createRef<HTMLIFrameElement>();

    this.state = {
      iframeRef,
      scriptsLoaded: 0,
      loadingState: "started",
      sketchId: props.sketchId,
      renderedCode: this.props.sketchCode,
    };
  }

  updateLoadingState(newState: TLoadingState) {
    Logger.debug(`Set loadingState: ${newState}`);
    this.setState({ loadingState: newState });
  }

  async componentDidMount() {
    Logger.debug(`Mounted new canvas iframe ${this.props.sketchId}`);
    const { contentWindow, document } = getIframeDocumentAndWindow(this.state);
    document.body.style.margin = "0";

    this.props.setRecompileSketch(() => {
      if (this.state.loadingState !== "userCodeLoaded") return;
      contentWindow.frameCount = 0;
      contentWindow.setup();
    });

    const allScripts = compileScriptList(
      this.props.sketchCode,
      this.props.userPersistedScripts
    );

    await Promise.all(allScripts.map(loadScript(document))).then(() => {
      Logger.info(`Loaded ${allScripts.length} scripts`);
      this.setState({
        scriptsLoaded: allScripts.length,
      });
      this.updateLoadingState("scriptsLoaded");
    });
  }

  shouldComponentUpdate(
    nextProps: Readonly<ISketchCanvasProps>,
    nextState: Readonly<ISketchCanvasState>
  ): boolean {
    if (nextState.loadingState === "started") {
      return false;
    }
    // Don't rerender if sketch changes, component should be remounted
    if (nextState.sketchId !== nextProps.sketchId) return false;

    if (
      nextProps.sketchCode === nextState.renderedCode &&
      nextState.loadingState === "userCodeLoaded"
    ) {
      return false;
    }

    return true;
  }

  async componentDidUpdate(
    prevProps: Readonly<ISketchCanvasProps>,
    prevState: Readonly<ISketchCanvasState>
  ): Promise<void> {
    const { document } = getIframeDocumentAndWindow(prevState);

    const formattedCode = formatUserCode(prevProps.sketchCode);

    loadProcessingScripts(
      document,
      {
        content: formattedCode,
        id: "userCode",
      },
      () => {
        Logger.info("Done loading user code");
        if (this.state.loadingState === "scriptsLoaded") {
          this.setState({ renderedCode: formattedCode });
          prevProps.setSketchLoaded();
          this.updateLoadingState("userCodeLoaded");
        }
      }
    );
  }

  render() {
    return (
      <StyledSketchCanvas>
        <StyledIframe
          sandbox="allow-same-origin allow-scripts allow-downloads allow-pointer-lock"
          ref={this.state.iframeRef}
        />
      </StyledSketchCanvas>
    );
  }
}

export default SketchCanvas;
