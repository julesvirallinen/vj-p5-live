import { FC } from "react";
import "./App.css";
import { CanvasWrapper } from "./components/CanvasWrapper";
import styled from "styled-components";
import { Menu } from "./components/Menu";
import { ShortcutProvider } from "./Providers/ShortcutProvider";
import { SettingsProvider } from "./Providers/SettingsProvider";
import { CurrentSketchProvider } from "./Providers/SketchProvider";

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
`;

const App: FC = () => {
  return (
    <StyledApp>
      <SettingsProvider>
        <CurrentSketchProvider>
          <ShortcutProvider>
            <CanvasWrapper />
            <Menu />
          </ShortcutProvider>
        </CurrentSketchProvider>
      </SettingsProvider>
    </StyledApp>
  );
};

export default App;
