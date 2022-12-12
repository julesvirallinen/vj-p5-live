import { useEffect, useState } from 'react';

import { useGlobalCommands } from '~/hooks/useGlobalCommands';

const IGNORED_SOURCES = [
  'react-devtools-bridge',
  'react-devtools-inject-backend',
  'react-devtools-content-script',
];

// ! TODO: figure out how to get from .env
const allowedOrigins = ['https://vjcode.art', 'http://localhost:5173'];

// ? How could
// - sketch continue on error with previous code?
// - sketch continue gracefully after error fixed?

export const useErrorReceiver = (iframeKey: number, errorOffset: number) => {
  const { errors, setErrors } = useGlobalCommands();
  const [handlerCreated, setHandlerCreated] = useState(false);

  useEffect(() => {
    if (handlerCreated) return;
    setHandlerCreated(true);
    window.addEventListener(
      'message',
      (event) => {
        if (!allowedOrigins.includes(event.origin)) return;

        if (IGNORED_SOURCES.includes(event?.data?.source)) return;
        const data = JSON.parse(event.data);

        if (data?.msg && data?.lineNumber) {
          const lineNumber = data.lineNumber - errorOffset;
          // eslint-disable-next-line
          console.error(`Error in sketch: ${data.msg}, on line: ${lineNumber}`);
          setErrors([
            ...errors,
            {
              message: data.msg,
              lineNumber,
            },
          ]);
        }
      },
      true
    );
  }, [errorOffset, errors, setErrors, handlerCreated]);

  useEffect(() => {
    setErrors([]);
  }, [iframeKey, setErrors]);
};
