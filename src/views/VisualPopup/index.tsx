import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ReactNewWindowStyles as NewWindow } from "react-new-window-styles";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { Video } from "./components/Video";

export interface IVisualsPopupProps {}

const CanvasVideo = styled(Video)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
    ::-webkit-media-controls {display:none !important;

`;

export const VisualsPopup: React.FC<IVisualsPopupProps> = ({
  ...restProps
}) => {
  const { canvasMediaStream, canvasPopupOpen, setCanvasPopupOpen } =
    useGlobalCommands();

  return (
    <>
      {canvasPopupOpen && canvasMediaStream && (
        <NewWindow
          windowProps={{
            status: false,
            menubar: false,
            location: false,
            width: 1000,
            height: 500,
          }}
          copyStyles={false}
          autoClose={true}
          onClose={() => setCanvasPopupOpen(false)}
          title="👀 VJ P5.js 👀"
          name="VISUALS"
          {...restProps}
        >
          <GlobalStyle />

          <CanvasVideo srcObject={canvasMediaStream} />
        </NewWindow>
      )}
    </>
  );
};
