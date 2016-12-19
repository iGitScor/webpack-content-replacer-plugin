const fs = require('fs');

module.exports = class ContentReplacer {

  constructor(options) {
    this.modifications = options.modifications;
    this.modifiedFile = options.modifiedFile;
  }

  replace() {
    const that = this;
    function replaceInFile(filePath, toReplace, replacement) {
      function replacer(match) {
        const replacementDebug = '\x1b[1m\x1b[34mReplacing in %s: %s => %s\x1b[0m';
        console.log(replacementDebug, filePath, match, replacement);

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
          const mainWarning = '\x1b[1m\x1b[33mWARNING in %s\x1b[0m';
          console.warn(mainWarning, that.modifiedFile);

          // Display replacement patterns
          const infoWarning = '\x1b[34mFile not found (%s not replaced by %s)\x1b[0m';
          console.warn(infoWarning, modif.regex, modif.modification);
        }
      });
    }
  }

  apply(compiler) {
    if (this.modifications && this.modifiedFile) {
      const that = this;
      compiler.plugin('after-emit', (compilation, callback) => {
        that.replace();
        callback();
      });
    }
  }

};
