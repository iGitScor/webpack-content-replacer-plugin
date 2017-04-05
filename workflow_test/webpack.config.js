const ContentReplacerWebpackPlugin = require('../index');

const htmlOptions = {
  buildTrigger: 'after-emit',
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
  buildTrigger: 'done',
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
    new ContentReplacerWebpackPlugin(htmlOptions),
    new ContentReplacerWebpackPlugin(cssOptions),
  ],
};
