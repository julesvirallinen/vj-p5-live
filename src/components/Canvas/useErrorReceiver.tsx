import { useEffect, useState } from 'react';
import * as R from 'ramda';

import { useGlobalCommands } from '~/hooks/useGlobalCommands';
import { useSketchCodeManager } from '~/hooks/useSketchCodeManager';

const IGNORED_SOURCES = [
  'react-devtools-bridge',
  'react-devtools-inject-backend',
  'react-devtools-content-script',
];

const ERROR_OFFSET_OFFSET = -2;

// ! TODO: figure out how to get from .env
const allowedOrigins = ['https://vjcode.art', 'http://localhost:5173'];

// ? How could
// - sketch continue on error with previous code?
// - sketch continue gracefully after error fixed?

export const useErrorReceiver = (iframeKey: number, errorOffset: number) => {
  const { sketch } = useSketchCodeManager();

  const codeLength = sketch?.code?.split('\n').length ?? 0;
  const additionalCodeLength = sketch?.additionalCode?.split('\n').length ?? 0;

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
          const lineNumber = R.clamp(
            0,
            codeLength,
            data.lineNumber - additionalCodeLength + ERROR_OFFSET_OFFSET
          );
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
