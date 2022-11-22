import { FC } from "react";
import "./App.css";
import { CanvasWrapper } from "./components/CanvasWrapper";
import styled from "styled-components";
import { Menu } from "./components/Menu";
import { CurrentSketchContextProvider } from "./Providers/currentSketchProvider";
import { useCurrentSketchData } from "./hooks/useCurrentSketchData";
import { ShortcutProvider } from "./Providers/ShortcutProvider";
import { SettingsProvider } from "./hooks/useSettings";

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
`;

const App: FC = () => {
  const props = useCurrentSketchData();

  return (
    <StyledApp>
      <SettingsProvider>
        <CurrentSketchContextProvider value={props}>
          <ShortcutProvider>
            <CanvasWrapper />
            <Menu />
          </ShortcutProvider>
        </CurrentSketchContextProvider>
      </SettingsProvider>
    </StyledApp>
  );
};

export default App;
