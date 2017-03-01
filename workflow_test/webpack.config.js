const ContentReplacer = require('../index');

const htmlOptions = {
  modifiedFile: './workflow_test/index.html',
  modifications: [
    {
      regex: /First Test/g,
      modification: 'First Test has been Replaced',
    },
    {
      regex: /Second Test/g,
      modification: 'Second Test has been Replaced',
    },
  ],
};

const cssOptions = {
  modifiedFile: './workflow_test/style.css',
  modifications: [
    {
      regex: /red/g,
      modification: 'blue',
    },
    {
      regex: /height/g,
      modification: 'width',
    },
  ],
};

module.exports = {
  plugins: [
    new ContentReplacer(htmlOptions),
    new ContentReplacer(cssOptions),
  ],
};
