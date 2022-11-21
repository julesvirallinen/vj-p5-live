import { FC } from "react";
import "./App.css";
import { CanvasWrapper } from "./components/CanvasWrapper";
import styled from "styled-components";

const StyledApp = styled.div`
  margin: 0;
  padding: 0;
`;

const App: FC = () => {
  return (
    <StyledApp>
      <CanvasWrapper />
    </StyledApp>
  );
};

export default App;
