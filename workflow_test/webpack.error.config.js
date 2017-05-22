const ContentReplacer = require('../index');

const noFileNoneLevelOptions = {
  modifiedFile: '/somepath',
  modifications: [
    {
      regex: /red/g,
      modification: 'blue',
    },
  ],
  logLevel: 'none',
};

const noFileLogLevelOptions = {
  modifiedFile: '/somepath',
  modifications: [
    {
      regex: /red/g,
      modification: 'blue',
    },
  ],
  logLevel: 'log',
};

module.exports = {
  noFileNoneLevelOptions: {
    plugins: [
      new ContentReplacer(noFileNoneLevelOptions),
    ],
  },
  noFileLogLevelOptions: {
    plugins: [
      new ContentReplacer(noFileLogLevelOptions),
    ],
  },
};
