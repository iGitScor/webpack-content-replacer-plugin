const fs = require('fs');

module.exports = class ContentReplacer {

  constructor(options) {
    this.modifications = options.modifications;
    this.modifiedFile = options.modifiedFile;
  }

  apply(compiler) {
    if (this.modifications && this.modifiedFile) {
      const that = this;
      compiler.plugin('after-emit', (compilation, callback) => {
        function replaceInFile(filePath, toReplace, replacement) {
          function replacer(match) {
            const debug = '\x1b[1m\x1b[34mReplacing in %s: %s => %s\x1b[0m';
            console.log(debug, filePath, match, replacement);

            return replacement;
          }

          const str = fs.readFileSync(filePath, 'utf8');
          const out = str.replace(new RegExp(toReplace), replacer);
          fs.writeFileSync(filePath, out);
        }

        if (Array.isArray(this.modifications) && this.modifications.length > 0) {
          [].forEach.call(this.modifications, (modif) => {
            replaceInFile(that.modifiedFile, modif.regex, modif.modification);
          });
        }

        callback();
      });
    }
  }

};
