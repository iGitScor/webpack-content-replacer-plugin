const fs = require('fs');

module.exports = class ContentReplacer {

  constructor(options) {
    this.assetPath = options.assetPath;
    this.manifestFile = options.manifestFile;
    this.files = options.files;
  }

  apply(compiler) {
    const that = this;
    compiler.plugin('after-emit', (compilation, callback) => {
      function replaceInFile(filePath, toReplace, replacement) {
        function replacer(match) {
          console.log('\x1b[1m\x1b[34mReplacing in %s: %s => %s\x1b[0m', filePath, match, replacement);

          return replacement;
        }

        const str = fs.readFileSync(filePath, 'utf8');
        const out = str.replace(new RegExp(toReplace), replacer);
        fs.writeFileSync(filePath, out);
      }

      [].forEach.call(this.files, (file) => {
        replaceInFile(that.manifestFile, file.regex, that.assetPath + file.name);
      });

      callback();
    });
  }

};
