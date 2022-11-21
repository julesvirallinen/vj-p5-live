import { FC } from "react";
import "./App.css";
import { CanvasWrapper } from "./components/CanvasWrapper";
import styled from "styled-components";
import { Menu } from "./components/Menu";
import { Provider } from "./Providers/currentSketchProvider";
import { useCurrentSketchData } from "./hooks/useCurrentSketchData";

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
`;

const App: FC = () => {
  const props = useCurrentSketchData();

  return (
    <StyledApp>
      <Provider value={props}>
        <CanvasWrapper />
        <Menu />
      </Provider>
    </StyledApp>
  );
};

export default App;
