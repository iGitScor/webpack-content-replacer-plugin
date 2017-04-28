'use strict';

const winston = require('winston');
const path = require('path');

const createLogger = (level, exception, file, exit) => {
  const loggerConfig = {
    transports: [
      new winston.transports.Console({
        level,
        handleExceptions: exception,
        humanReadableUnhandledException: true,
        json: false,
        colorize: true,
      }),
    ],
    exitOnError: exit,
  };
  if (file) {
    loggerConfig.transports.push(new winston.transports.File({
      level,
      filename: path.join(__dirname, '/../warning.log'),
      handleExceptions: exception,
      json: false,
    }));
  }

  return new winston.Logger(loggerConfig);
};

module.exports = (level) => {
  if (level === undefined) {
    return { warn: () => {} };
  }

  const exceptionLevel = level.toLowerCase();
  let logger;
  switch (exceptionLevel) {
    case 'none':

      // level, exception, file, exit
      logger = createLogger('warn', true, false, false);
      break;

    case 'log':

      // level, exception, file, exit
      logger = createLogger('warn', true, true, false);
      break;

    case 'strict':
    default:

      // level, exception, file, exit
      logger = createLogger('error', false, false, true);
      break;
  }

  return logger;
};
