const ContentReplacerWebpackPlugin = require('../index');

const htmlOptions = {
  buildTrigger: 'after-emit',
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
  buildTrigger: 'done',
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
    new ContentReplacerWebpackPlugin(htmlOptions),
    new ContentReplacerWebpackPlugin(cssOptions),
  ],
};
