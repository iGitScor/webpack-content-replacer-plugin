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
      const error = ContentReplacer.hasRequiredParameters(options)
        ? 'Parameters are invalid'
        : 'Required parameters are missing';

      throw new Error(error);
    }
  }

  static hasRequiredParameters(options) {
    return options.modifications && options.modifiedFile;
  }

  static hasValidOptions(options) {
    return ContentReplacer.hasRequiredParameters(options) &&
      (validBuildTrigger.indexOf(options.buildTrigger) >= 0 ||
        !Object.hasOwnProperty.call(options, 'buildTrigger'));
  }

  replace() {
    const that = this;
    function replaceInFile(filePath, toReplace, replacement) {
      function replacer(match) {
        if (that.verbose) {
          const replacementDebug = '\x1B[1m\x1B[34mReplacing in %s: %s => %s\x1B[0m';

          // eslint-disable-next-line no-console
          console.log(replacementDebug, filePath, match, replacement);
        }

        return replacement;
      }

      const str = fs.readFileSync(filePath, 'utf8');
      const out = str.replace(new RegExp(toReplace), replacer);
      fs.writeFileSync(filePath, out);
    }

    if (Array.isArray(this.modifications) && this.modifications.length > 0) {
      [].forEach.call(this.modifications, (modif) => {
        if (fs.existsSync(that.modifiedFile)) {
          replaceInFile(that.modifiedFile, modif.regex, modif.modification);
        } else {
          // Log not found file path
          const mainWarning = '\x1B[1m\x1B[33mWARNING in %s\x1B[0m';

          // eslint-disable-next-line no-console
          console.warn(mainWarning, that.modifiedFile);

          // Display replacement patterns
          const infoWarning = '\x1B[34mFile not found (%s not replaced by %s)\x1B[0m';

          // eslint-disable-next-line no-console
          console.warn(infoWarning, modif.regex, modif.modification);
        }
      });
    }
  }

  apply(compiler) {
    if (this.modifications && this.modifiedFile) {
      const that = this;
      compiler.plugin(this.buildTrigger, (compilation, callback) => {
        that.replace();
        callback();
      });
    }
  }
};
