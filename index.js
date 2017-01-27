const fs = require('fs');

const validBuildTrigger = ['after-emit', 'done', 'failed'];

module.exports = class ContentReplacer {
  constructor(options) {
    if (ContentReplacer.hasValidOptions(options)) {
      this.modifications = options.modifications;
      this.modifiedFile = options.modifiedFile;

      // Optional parameters
      this.buildTrigger = options.buildTrigger || 'after-emit';
      this.silent = options.silent === true || false;
      this.verbose = !this.silent;
    } else {
      // Throw exception
      const error = typeof options === 'object' && ContentReplacer.hasRequiredParameters(options)
        ? 'Parameters are invalid'
        : 'Required parameters are missing';

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

    return ContentReplacer.hasRequiredParameters(options) &&
      (validBuildTrigger.indexOf(options.buildTrigger) >= 0 ||
        !Object.hasOwnProperty.call(options, 'buildTrigger'));
  }

  replace() {
    const that = this;
    if (fs.existsSync(this.modifiedFile)) {
      if (Array.isArray(this.modifications) && this.modifications.length > 0) {
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
      }

      return true;
    } else if (this.verbose) {
        // Log not found file path
      const mainWarning = '\x1B[1m\x1B[33mWARNING in %s\x1B[0m';

        // eslint-disable-next-line no-console
      console.warn(mainWarning, this.modifiedFile);

        // Display replacement patterns
      const infoWarning = '\x1B[34mFile not found\x1B[0m';

        // eslint-disable-next-line no-console
      console.warn(infoWarning);
    }

    return false;
  }

  apply(compiler) {
    const that = this;
    compiler.plugin(this.buildTrigger, (compilation, callback) => {
      that.replace();
      callback();
    });
  }
};
