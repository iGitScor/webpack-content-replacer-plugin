'use strict';

const fs = require('fs');
const logger = require('./helpers/logger');

const validBuildTrigger = ['after-emit', 'done'];

module.exports = class ContentReplacerWebpackPlugin {
  constructor(options) {
    if (ContentReplacerWebpackPlugin.hasValidOptions(options)) {
      this.modifications = options.modifications;
      this.modifiedFile = options.modifiedFile;

      // Optional parameters
      this.buildTrigger = options.buildTrigger || 'after-emit';
      this.silent = options.silent === true || false;
      this.verbose = !this.silent;

      this.logLevel = options.logLevel || 'strict';
      this.addLogger();
    } else {
      // Throw exception
      const error = typeof options === 'object'
        ? 'Required parameters are missing'
        : 'Parameters are invalid';

      this.silent = false;
      this.logLevel = 'strict';
      this.addLogger();
      this.exceptionLogger.warn(error);

      throw new Error(error);
    }
  }

  static hasRequiredParameters(options) {
    return Object.hasOwnProperty.call(options, 'modifications') &&
      Object.hasOwnProperty.call(options, 'modifiedFile');
  }

  static hasValidOptions(options) {
    if (typeof options !== 'object') {
      return false;
    }

    return ContentReplacerWebpackPlugin.hasRequiredParameters(options) &&
      (validBuildTrigger.indexOf(options.buildTrigger) >= 0 ||
        !Object.hasOwnProperty.call(options, 'buildTrigger')) &&
      (Array.isArray(options.modifications) &&
        options.modifications.length > 0);
  }

  addLogger() {
    if (!this.silent) {
      this.exceptionLogger = logger(this.logLevel);
    } else {
      // Empty logger when silent mode is activated
      this.exceptionLogger = logger();
    }
  }

  replace() {
    const that = this;
    if (fs.existsSync(this.modifiedFile)) {
      [].forEach.call(this.modifications, (modif) => {
        const str = fs.readFileSync(that.modifiedFile, 'utf8');
        const out = str.replace(new RegExp(modif.regex), modif.modification);
        fs.writeFileSync(that.modifiedFile, out);

        if (that.verbose) {
          const replacementDebug = '\x1B[1m\x1B[34mReplacing in %s: %s => %s\x1B[0m';

          // eslint-disable-next-line no-console
          console.log(replacementDebug, that.modifiedFile, modif.regex, modif.modification);
        }
      });

      return true;
    }

    this.exceptionLogger.warn('File not found');

    if (this.logLevel === 'strict') {
      throw new Error('File not found');
    }

    return false;
  }

  apply(compiler) {
    const that = this;
    compiler.plugin(this.buildTrigger, (compilation, callback) => {
      that.replace();
      if (callback) {
        callback();
      }
    });
  }
};
