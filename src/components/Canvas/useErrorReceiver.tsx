import { useEffect } from "react";
import Logger from "js-logger";

import { useGlobalCommands } from "~/hooks/useGlobalCommands";

const IGNORED_SOURCES = [
  "react-devtools-bridge",
  "react-devtools-inject-backend",
  "react-devtools-content-script",
];

export const useErrorReceiver = (iframeKey: number, errorOffset: number) => {
  const { errors, setErrors } = useGlobalCommands();

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "http://localhost:5173") return;

        if (IGNORED_SOURCES.includes(event?.data?.source)) return;
        const data = JSON.parse(event.data);

        if (data?.msg && data?.lineNumber) {
          setErrors([
            ...errors,
            {
              message: data.msg,
              lineNumber: data.lineNumber - errorOffset,
            },
          ]);
        }
      },
      true
    );
  }, [errorOffset, errors, setErrors]);

  useEffect(() => {
    Logger.warn(errors);
  }, [errors]);

  useEffect(() => {
    setErrors([]);
  }, [iframeKey, setErrors]);
};
