const path = require('path');
const ContentReplacerPlugin = require('../index.js');
const expect = require('expect.js');

let contentReplacer;
const options = {
  modifiedFile: './file.txt',
  modifications: [
    {
      regex: /%content_to_be_deleted%/g,
      modification: 'new_content',
    },
  ],
};

const invalidOptionsType = '';
const invalidOptionsObj = {};

describe('ContentReplacer plugin', () => {
  it('should be instantiated', () => {
    contentReplacer = new ContentReplacerPlugin(options);
    expect(typeof contentReplacer).to.equal('object');
  });

  it('should throw error', () => {
    const noParamConstructor = function () {
      // eslint-disable-next-line no-new
      new ContentReplacerPlugin();
    };

    expect(noParamConstructor).to.throwException();
  });

  it('should have default options', () => {
    expect(contentReplacer.buildTrigger).to.equal('after-emit');
    expect(contentReplacer.silent).to.equal(false);
    expect(contentReplacer.verbose).to.equal(true);
  });

  it('should have valid options', () => {
    expect(ContentReplacerPlugin.hasValidOptions(options)).to.equal(true);
  });

  it('should detect invalid options (string)', () => {
    expect(ContentReplacerPlugin.hasValidOptions(invalidOptionsType)).to.equal(false);
  });

  it('should have required parameters', () => {
    expect(ContentReplacerPlugin.hasRequiredParameters(options)).to.equal(true);
  });

  it('should detect missing required parameters', () => {
    expect(ContentReplacerPlugin.hasRequiredParameters(invalidOptionsObj)).to.equal(false);
  });

  it('should detect missing file', () => {
    contentReplacer.verbose = false;
    expect(contentReplacer.replace()).to.equal(false);
  });

  it('should replace content', () => {
    contentReplacer.modifiedFile = path.resolve('test/file.txt');
    expect(contentReplacer.replace()).to.equal(true);

    contentReplacer.modifications = [
      {
        regex: /new_content/g,
        modification: '%content_to_be_deleted%',
      },
    ];
    contentReplacer.replace();
  });
});
