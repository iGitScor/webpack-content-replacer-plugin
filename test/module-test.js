'use strict';

const fs = require('fs');
const path = require('path');
const ContentReplacerPlugin = require('../index.js');
const expect = require('expect.js');
const webpackMock = require('webpack-mock');

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
  before(() => {
    fs.writeFileSync('test/file.txt', '%content_to_be_deleted%');
  });

  after(() => {
    fs.unlinkSync('test/file.txt');
  });

  it('should be instantiated', () => {
    contentReplacer = new ContentReplacerPlugin(options);
    expect(typeof contentReplacer).to.equal('object');
  });

  it('should throw error when no parameters', () => {
    const noParamConstructor = function () {
      // eslint-disable-next-line no-new
      new ContentReplacerPlugin();
    };

    expect(noParamConstructor).to.throwException(/Parameters are invalid/);
  });

  it('should throw error when parameter format is wrong', () => {
    const wrongParamConstructor = function () {
      // eslint-disable-next-line no-new
      new ContentReplacerPlugin({});
    };

    expect(wrongParamConstructor).to.throwException(/Required parameters are missing/);
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
    expect(contentReplacer.replace).to.throwException(/File not found/);

    contentReplacer.verbose = true;
    expect(contentReplacer.replace).to.throwException(/File not found/);
  });

  it('should replace content', () => {
    contentReplacer.verbose = false;
    contentReplacer.modifiedFile = path.resolve('test/file.txt');
    expect(contentReplacer.replace()).to.equal(true);

    // Test with verbose mode
    contentReplacer.verbose = true;
    contentReplacer.modifications = [
      {
        regex: /new_content/g,
        modification: '%content_to_be_deleted%',
      },
    ];
    expect(contentReplacer.replace()).to.equal(true);
  });

  it('should apply compiler (webpack-mock)', () => {
    contentReplacer.apply(webpackMock);
  });
});
