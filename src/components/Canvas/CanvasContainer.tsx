import SketchCanvas, {
  ISketchCanvasProps,
} from '../../../node_modules/react-p5js-canvas';
import React from 'react';
import styled from 'styled-components';

import { useGlobalCommands } from '../../hooks/useGlobalCommands';
import { useSettings } from '../../hooks/useSettings';
import { useSketchCodeManager } from '../../hooks/useSketchCodeManager';

import { formatUserCode } from '~/components/Canvas/libs/formatUserCode';
import { useErrorReceiver } from '~/components/Canvas/useErrorReceiver';
import { useRecompileCanvas } from '~/components/Canvas/useRecompileCanvas';
import { ALWAYS_LOADED_SCRIPTS } from '~/defs/alwaysLoadedScripts';

export interface ICanvasContainerProps {}

const StyledCanvasContainer = styled.div``;

const StyledLoading = styled.div`
  position: fixed;
  background-color: black;
  width: 100%;
  height: 100%;
`;

// Small hook to handle passing props forward to canvas from providers
const useGetSketchCanvasProps = (props: {
  setRecompileSketch: ISketchCanvasProps['globalSetters']['setRecompileSketch'];
}) => {
  const { sketch } = useSketchCodeManager();

  const { userLoadedScripts } = useSettings();

  const { setCanvasMediaStream, canvasPopupOpen, setIframeRef } =
    useGlobalCommands();

  const code = formatUserCode(sketch.code, sketch.additionalCode);

  return {
    sketch,
    code,
    userPersistedScripts: [...ALWAYS_LOADED_SCRIPTS, ...userLoadedScripts],
    canvasPopupOpen,
    globalSetters: {
      setIframeRef,
      setRecompileSketch: props.setRecompileSketch,
      setCanvasMediaStream,
    },
  };
};

export const CanvasContainer: React.FC<ICanvasContainerProps> = ({
  ...restProps
}) => {
  const { iframeKey, setRecompileSketch, setSketchLoaded, sketchLoaded } =
    useRecompileCanvas();

  const sketchCanvasProps = useGetSketchCanvasProps({ setRecompileSketch });

  useErrorReceiver(
    iframeKey,
    // ! offset calculation is off and needs work
    sketchCanvasProps.sketch.additionalCode.split('\n').length
  );

  return (
    <StyledCanvasContainer {...restProps}>
      <SketchCanvas
        {...sketchCanvasProps}
        key={iframeKey}
        setSketchLoaded={() => setSketchLoaded(true)}
      />
      {!sketchLoaded && <StyledLoading />}
    </StyledCanvasContainer>
  );
};
