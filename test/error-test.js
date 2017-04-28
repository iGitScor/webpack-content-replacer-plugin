'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const webpack = require('webpack');
const except = require('./../workflow_test/webpack.error.config.js');

let stat;
let error;
let compiler = webpack(except.noFileLogLevelOptions);

/**
 ***************************************************************************
 * Log level
 ***************************************************************************
 */

describe('Webpack workflow log handler test case', function testcase() {
  this.timeout(50000);

  before((done) => {
    compiler.run((err, stats) => {
      stat = stats;
      error = err;

      return done();
    });
  });

  it('should return error in log level', () => {
    expect(error).to.equal(null);
    expect(stat).to.not.be.empty();
    fs.readFile(path.join(__dirname, '../warning.log'), (readError, data) => {
      expect(readError).to.be.equal(null);
      expect(data.toString('utf8')).to.not.be.empty();
    });
  });
});

/**
 ***************************************************************************
 * None level
 ***************************************************************************
 */

compiler = webpack(except.noFileNoneLevelOptions);

describe('Webpack workflow none exception handler test case', function testcase() {
  this.timeout(50000);

  before((done) => {
    compiler.run((err, stats) => {
      stat = stats;
      error = err;

      return done();
    });
  });

  it('should return error in none level', () => {
    expect(error).to.equal(null);
    expect(stat).to.not.be.empty();
  });
});
