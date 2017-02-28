const ContentReplacer = require('../index');

const htmlOptions = {
  modifiedFile: './workflow_test/index.html',
  modifications: [
    {
      regex: /FTest/g,
      modification: 'Replaced',
    },
    {
      regex: /STest/g,
      modification: 'Replaced2',
    },
  ],
};

const cssOptions = {
  modifiedFile: './workflow_test/style.css',
  modifications: [
    {
      regex: /red/g,
      modification: 'Replaced',
    },
    {
      regex: /height/g,
      modification: 'Replaced2',
    },
  ],
};

module.exports = {
  plugins: [
    new ContentReplacer(htmlOptions),
    new ContentReplacer(cssOptions),
  ],
};
