import React, { FC } from "react";
import "./App.css";
import styled from "styled-components";
import { Menu } from "./views/Menu";
import { ShortcutProvider } from "./providers/ShortcutProvider";
import { SettingsProvider } from "./providers/SettingsProvider";
import { CurrentSketchProvider } from "./providers/SketchProvider";
import { ActionBar } from "./components/ActionBar";
import Theme from "./providers/ThemeProvider";
import { ConsoleHandler } from "./providers/ConsoleHandler";
import Logger from "js-logger";
import { VisualsPopup } from "./views/VisualPopup";
import { EditorAndCanvasView } from "./views/EditorAndCanvasView";

const StyledApp = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;

  * > * {
    color: ${(props) => props.theme.colors.primary};
    /* font-family: 'Roboto', serif; */
  }
`;

const StyledActionBar = styled(ActionBar)`
  position: fixed;
  left: 5rem;
  bottom: 1rem;
`;

const App: FC = () => {
  Logger.useDefaults({
    defaultLevel: Logger.DEBUG,
    formatter: function (messages, context) {
      messages.unshift(new Date().toTimeString().slice(0, 8));
    },
  });
  return (
    <SettingsProvider>
      <CurrentSketchProvider>
        <ShortcutProvider>
          <Theme>
            <StyledApp>
              <EditorAndCanvasView />
              <Menu />
              <StyledActionBar />
              <ConsoleHandler />
              <VisualsPopup />
            </StyledApp>
          </Theme>
        </ShortcutProvider>
      </CurrentSketchProvider>
    </SettingsProvider>
  );
};

export default App;
