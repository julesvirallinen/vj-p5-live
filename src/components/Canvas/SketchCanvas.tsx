import React, { Component, Dispatch, RefObject } from 'react';
import Logger from 'js-logger';
import styled from 'styled-components';

import { TCanvasWindowProps } from '../../models/canvas';
import { TSrcScript } from '../../models/script';

import { compileScriptList } from './libs/extractScripts';
import { loadProcessingScripts, loadScript } from './libs/loadScripts';

const StyledSketchCanvas = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: black;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  background-color: black;
  color-scheme: none;
`;

export interface ISketchCanvasProps {
  userPersistedScripts: TSrcScript[];
  code: string;
  globalSetters: {
    setRecompileSketch: Dispatch<
      React.SetStateAction<(() => void | undefined) | undefined>
    >;
    setCanvasMediaStream: (s: MediaStream) => void;
    setIframeRef: (r: RefObject<HTMLIFrameElement>) => void;
  };

  setSketchLoaded: () => void;
  key: number;
  canvasPopupOpen: boolean;
}

export interface ISketchCanvasState {
  iframeRef: RefObject<HTMLIFrameElement>;
  loadingState: TLoadingState;
  code: string;
}

type TLoadingState =
  | 'not_started'
  | 'started'
  | 'scriptsLoaded'
  | 'userCodeLoaded';

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
      loadingState: 'started',
      code: this.props.code,
    };
  }

  updateLoadingState(newState: TLoadingState) {
    this.setState({ loadingState: newState });
  }

  recompileSketch() {
    const { contentWindow } = getIframeDocumentAndWindow(this.state);

    Logger.debug('Recompiled sketch');

    if (this.state.loadingState !== 'userCodeLoaded') return;
    this.updateUserCode(this.props.code);
    contentWindow.setup();
    contentWindow.frameCount = 0;
  }

  async componentDidMount() {
    Logger.time(`sketchRenderTime`);
    const { document } = getIframeDocumentAndWindow(this.state);
    document.body.style.margin = '0';

    this.props.globalSetters.setIframeRef(this.state.iframeRef);

    const allScripts = compileScriptList(
      this.props.code,
      this.props.userPersistedScripts
    );

    await Promise.all(allScripts.map(loadScript(document))).then(() => {
      Logger.info(`Loaded ${allScripts.length} scripts`);

      this.updateLoadingState('scriptsLoaded');
    });
    this.props.globalSetters.setRecompileSketch(() =>
      this.recompileSketch.bind(this)
    );
  }

  shouldComponentUpdate(
    nextProps: Readonly<ISketchCanvasProps>,
    nextState: Readonly<ISketchCanvasState>
  ): boolean {
    if (!this.props.canvasPopupOpen && nextProps.canvasPopupOpen) {
      return true;
    }

    if (nextState.loadingState === 'started') {
      Logger.debug('Scripts not loaded, not updating');

      return false;
    }

    if (nextState.loadingState === 'scriptsLoaded') {
      return true;
    }

    if (nextProps.code !== this.props.code) {
      return true;
    }

    if (
      nextProps.code === nextState.code &&
      nextState.loadingState === 'userCodeLoaded'
    ) {
      return false;
    } else {
      this.setState({ code: nextProps.code });
      Logger.debug('Updating sketch code');

      return true;
    }
  }

  updateUserCode(code: ISketchCanvasProps['code']) {
    const { document } = getIframeDocumentAndWindow(this.state);

    loadProcessingScripts(
      document,
      {
        content: code,
        id: 'userCode',
      },
      () => {
        Logger.info('Done loading user code');

        if (this.state.loadingState === 'scriptsLoaded') {
          Logger.timeEnd(`sketchRenderTime`);
          this.props.setSketchLoaded();
          this.updateLoadingState('userCodeLoaded');
        }
      }
    );
  }

  createCanvasPopstream() {
    const { document } = getIframeDocumentAndWindow(this.state);
    const stream = document.querySelector('canvas')?.captureStream();

    if (stream) {
      Logger.debug('Popstream updated');
      this.props.globalSetters.setCanvasMediaStream(stream);
    } else {
      Logger.warn('Popstream not updated');
    }
  }

  componentDidUpdate(): void {
    this.updateUserCode(this.props.code);
    this.props.canvasPopupOpen &&
      setTimeout(() => this.createCanvasPopstream(), 100);
  }

  render() {
    Logger.debug('Canvas rerendered');

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
