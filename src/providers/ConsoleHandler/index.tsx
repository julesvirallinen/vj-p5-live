import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Hook, Console, Decode } from "console-feed";
import { Message } from "console-feed/lib/definitions/Console";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import * as R from "ramda";

const MESSAGES_TO_SHOW = 2;

export interface IConsoleHandlerProps {}

const StyledConsoleHandler = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 20rem;
  height: 5rem;
  background-color: black !important;
`;

const StyledConsole = styled(Console)`
  background-color: black !important;
  color: white ! !important; ;
`;

export const ConsoleHandler: React.FC<IConsoleHandlerProps> = ({
  ...restProps
}) => {
  const [logs, setLogs] = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState<string | undefined>(undefined);
  const { canvasIframeRef } = useGlobalCommands();
  const canvasWindow = useMemo(() => {
    return canvasIframeRef?.current?.contentWindow?.window;
  }, [canvasIframeRef]);

  useEffect(() => {
    if (!canvasWindow) return;
    Hook(canvasWindow.console, (log) => {
      const thisMessage = R.path<string>([0, "data", 0], log);
      if (lastMessage === thisMessage) return;
      thisMessage && setLastMessage(thisMessage);
      setLogs([...R.takeLast(MESSAGES_TO_SHOW, logs), Decode(log)]);
    });
  }, [canvasWindow, logs, lastMessage]);

  useEffect(() => {
    Hook(window.console, (log) => {
      const thisMessage = R.path<string>([0, "data", 0], log);
      if (lastMessage === thisMessage) return;
      thisMessage && setLastMessage(thisMessage);
      setLogs([...R.takeLast(MESSAGES_TO_SHOW, logs), Decode(log)]);
    });
  }, [logs, lastMessage]);

  return (
    <StyledConsoleHandler {...restProps}>
      <StyledConsole logs={logs as any} variant="dark" />
    </StyledConsoleHandler>
  );
};
