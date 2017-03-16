const fs = require('fs');
const path = require('path');
const ContentReplacerWebpackPlugin = require('../index.js');
const expect = require('expect.js');
const webpackMock = require('webpack-mock');

let contentReplacerWebpackPlugin;
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

describe('ContentReplacerWebpackPlugin plugin', () => {
  before(() => {
    fs.writeFileSync('test/file.txt', '%content_to_be_deleted%');
  });

  after(() => {
    fs.unlinkSync('test/file.txt');
  });

  it('should be instantiated', () => {
    contentReplacerWebpackPlugin = new ContentReplacerWebpackPlugin(options);
    expect(typeof contentReplacerWebpackPlugin).to.equal('object');
  });

  it('should throw error when no parameters', () => {
    const noParamConstructor = function () {
      // eslint-disable-next-line no-new
      new ContentReplacerWebpackPlugin();
    };

    expect(noParamConstructor).to.throwException(/Parameters are invalid/);
  });

  it('should throw error when parameter format is wrong', () => {
    const wrongParamConstructor = function () {
      // eslint-disable-next-line no-new
      new ContentReplacerWebpackPlugin({});
    };

    expect(wrongParamConstructor).to.throwException(/Required parameters are missing/);
  });

  it('should have default options', () => {
    expect(contentReplacerWebpackPlugin.buildTrigger).to.equal('after-emit');
    expect(contentReplacerWebpackPlugin.silent).to.equal(false);
    expect(contentReplacerWebpackPlugin.verbose).to.equal(true);
  });

  it('should have valid options', () => {
    expect(ContentReplacerWebpackPlugin.hasValidOptions(options)).to.equal(true);
  });

  it('should detect invalid options (string)', () => {
    expect(ContentReplacerWebpackPlugin.hasValidOptions(invalidOptionsType)).to.equal(false);
  });

  it('should have required parameters', () => {
    expect(ContentReplacerWebpackPlugin.hasRequiredParameters(options)).to.equal(true);
  });

  it('should detect missing required parameters', () => {
    expect(ContentReplacerWebpackPlugin.hasRequiredParameters(invalidOptionsObj)).to.equal(false);
  });

  it('should detect missing file', () => {
    contentReplacerWebpackPlugin.verbose = false;
    expect(contentReplacerWebpackPlugin.replace).to.throwException(/File not found/);

    contentReplacerWebpackPlugin.verbose = true;
    expect(contentReplacerWebpackPlugin.replace).to.throwException(/File not found/);
  });

  it('should replace content', () => {
    contentReplacerWebpackPlugin.verbose = false;
    contentReplacerWebpackPlugin.modifiedFile = path.resolve('test/file.txt');
    expect(contentReplacerWebpackPlugin.replace()).to.equal(true);

    // Test with verbose mode
    contentReplacerWebpackPlugin.verbose = true;
    contentReplacerWebpackPlugin.modifications = [
      {
        regex: /new_content/g,
        modification: '%content_to_be_deleted%',
      },
    ];
    expect(contentReplacerWebpackPlugin.replace()).to.equal(true);
  });

  it('should apply compiler (webpack-mock)', () => {
    contentReplacerWebpackPlugin.apply(webpackMock);
  });
});
