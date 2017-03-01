const ContentReplacer = require('../index');

const htmlOptions = {
  modifiedFile: './workflow_test/index.html',
  modifications: [
    {
      regex: /First Test has been Replaced/g,
      modification: 'First Test',
    },
    {
      regex: /Second Test has been Replaced/g,
      modification: 'Second Test',
    },
  ],
};

const cssOptions = {
  modifiedFile: './workflow_test/style.css',
  modifications: [
    {
      regex: /blue/g,
      modification: 'red',
    },
    {
      regex: /width/g,
      modification: 'height',
    },
  ],
};

module.exports = {
  plugins: [
    new ContentReplacer(htmlOptions),
    new ContentReplacer(cssOptions),
  ],
};
