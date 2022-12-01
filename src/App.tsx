import React, { FC } from "react";
import "./App.css";
import { CanvasWrapper } from "./components/CanvasWrapper";
import styled from "styled-components";
import { Menu } from "./components/Menu";
import { ShortcutProvider } from "./providers/ShortcutProvider";
import { SettingsProvider } from "./providers/SettingsProvider";
import { CurrentSketchProvider } from "./providers/SketchProvider";
import { ActionBar } from "./components/ActionBar";
import Theme from "./providers/ThemeProvider";

const StyledApp = styled.div`
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
  return (
    <SettingsProvider>
      <CurrentSketchProvider>
        <ShortcutProvider>
          <Theme>
            <StyledApp>
              <CanvasWrapper />
              <Menu />
              <StyledActionBar />
            </StyledApp>
          </Theme>
        </ShortcutProvider>
      </CurrentSketchProvider>
    </SettingsProvider>
  );
};

export default App;
