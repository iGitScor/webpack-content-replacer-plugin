const ContentReplacer = require('../index');

const htmlOptions = {
  modifiedFile: './workflow_test/index.html',
  modifications: [
    {
      regex: /Replaced/g,
      modification: 'FTest',
    },
    {
      regex: /Replaced2/g,
      modification: 'STest',
    },
  ],
};

const cssOptions = {
  modifiedFile: './workflow_test/style.css',
  modifications: [
    {
      regex: /Replaced/g,
      modification: 'red',
    },
    {
      regex: /Replaced2/g,
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
