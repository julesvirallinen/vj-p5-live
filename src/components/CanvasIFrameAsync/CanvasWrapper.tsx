import React, { Component } from "react";
import styled from "styled-components";
import { TSrcScript } from "../../models/script";
import SketchCanvas from "./SketchCanvas";
import Logger from "js-logger";

const StyledCanvasWrapper = styled.div``;

const StyledLoading = styled.div`
  background-color: green;
  width: 100%;
  height: 100%;
`;

interface ICanvasWrapperProps {
  scripts: TSrcScript[];
  sketch: { code: string; id: string };
  sketchId: string;
  setRecompileSketch: (any) => void;
  setHardCompileSketch: (any) => void;
  setCanvasMediaStream: (any) => void;
}

interface ICanvasWrapperState {
  scripts?: TSrcScript[];
  canvasKey: number;
  currentSketchData?: { id: string; code: string; scripts: TSrcScript[] };
  sketchLoaded: boolean;
  codeToRender: string;
}

/**
 * The design idea was only to use modern FC / hook code, but I realized that the useEffect hell that ensued isn't quite suitable for the script
 * chaos that this app requires. So the canvas things will be partly class-react
 */
class CanvasWrapper extends Component<
  ICanvasWrapperProps,
  ICanvasWrapperState
> {
  constructor(props: ICanvasWrapperProps) {
    super(props);
    const canvasKey = new Date().getTime();
    this.state = {
      canvasKey,
      sketchLoaded: false,
      codeToRender: props.sketch.code,
    };
  }

  updateCanvasKey() {
    const canvasKey = new Date().getTime();

    Logger.debug("Set new canvaskey ", canvasKey);
    this.setState({ canvasKey, sketchLoaded: false });
  }

  componentDidMount() {
    this.props.setHardCompileSketch(() => {
      if (this.state.sketchLoaded) {
        this.updateCanvasKey();
      }
    });
  }

  shouldComponentUpdate(
    nextProps: Readonly<ICanvasWrapperProps>,
    nextState: Readonly<ICanvasWrapperState>,
    nextContext: any
  ): boolean {
    return true;
  }

  componentDidUpdate(
    prevProps: Readonly<ICanvasWrapperProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {}

  render() {
    if (!this.props.sketch) return;
    return (
      <StyledCanvasWrapper>
        {!this.state.sketchLoaded && <StyledLoading />}
        <SketchCanvas
          userPersistedScripts={this.props.scripts}
          setRecompileSketch={this.props.setRecompileSketch}
          sketchCode={this.props.sketch.code}
          sketchId={this.props.sketch.id}
          key={this.state.canvasKey}
          setCanvasMediaStream={this.props.setCanvasMediaStream}
          setSketchLoaded={() => this.setState({ sketchLoaded: true })}
        />
      </StyledCanvasWrapper>
    );
  }
}

export default CanvasWrapper;
