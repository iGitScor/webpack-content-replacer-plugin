# Webpack content replacer

Replace content in file after emit in webpack workflow

[![Build Status](https://travis-ci.org/iGitScor/webpack-content-replacer.svg?branch=master)](https://travis-ci.org/iGitScor/webpack-content-replacer)
[![dependencies Status](https://david-dm.org/iGitScor/webpack-content-replacer/status.svg)](https://david-dm.org/iGitScor/webpack-content-replacer)
[![devDependencies Status](https://david-dm.org/iGitScor/webpack-content-replacer/dev-status.svg)](https://david-dm.org/iGitScor/webpack-content-replacer?type=dev)

## Install Instructions

```bash
$ npm i webpack-content-replacer
```
Note: This plugin needs NodeJS >= 6

## Usage Instructions

**Require `webpack-content-replacer`**
```javascript
var ContentReplacer = require('webpack-s3-plugin')
```

Add the plugin to your plugin list
```javascript
var config = {
  plugins: [
    new ContentReplacer({
      assetPath: 'http://cdn.example.com/bundle/',
      manifestFile: './relative_path/file_to_be_modified.ext',
      files: [
        {
          regex: /%content_to_be_deleted%/g,
          name: 'file2-filename.ext',
        },
        {
          regex: /%content2_to_be_deleted%/g,
          name: 'file1-filename.ext',
        },
      ],
    })
  ]
}
```

### Options

- `assetPath`: For absolute url rewriting
- `manifestFile`: File to be modified
- `files`: Array of file object having regex and name property

### Contributing

All contributions are welcome. Please make a pull request and make sure things still pass after running `npm run test`
