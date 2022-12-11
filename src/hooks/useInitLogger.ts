import Logger from 'js-logger';

export default () => {
  const envLogLevel = import.meta.env.VITE_LOG_LEVEL as 'debug' | undefined;

  const logLevel = envLogLevel === 'debug' ? Logger.DEBUG : Logger.WARN;

  Logger.useDefaults({
    defaultLevel: logLevel,
    formatter: function (messages, context) {
      messages.unshift(new Date().toTimeString().slice(0, 8));
    },
  });
};
