# Webpack content replacer

Replace content in file after emit in webpack workflow

[![Build Status](https://travis-ci.org/iGitScor/webpack-content-replacer.svg?branch=master)](https://travis-ci.org/iGitScor/webpack-content-replacer)
[![dependencies Status](https://david-dm.org/iGitScor/webpack-content-replacer/status.svg)](https://david-dm.org/iGitScor/webpack-content-replacer)
[![devDependencies Status](https://david-dm.org/iGitScor/webpack-content-replacer/dev-status.svg)](https://david-dm.org/iGitScor/webpack-content-replacer?type=dev)

## Install Instructions

```bash
$ npm i webpack-content-replacer-plugin
```
Note: This plugin needs NodeJS >= 6

## Usage Instructions

**Require `webpack-content-replacer`**
```javascript
var ContentReplacer = require('webpack-content-replacer-plugin')
```

Add the plugin to your plugin list
```javascript
var config = {
  plugins: [
    new ContentReplacer({
      modifiedFile: './relative_path/file_to_be_modified.ext',
      modifications: [
        {
          regex: /%content_to_be_deleted%/g,
          modification: 'new_content',
        },
        {
          regex: /%content2_to_be_deleted%/g,
          modification: 'new_content2',
        },
      ],
    })
  ]
}
```

### Options

- `modifiedFile`: File to be modified
- `modifications`: Array of modifications' object having regex and modification property

### Contributing

All contributions are welcome. Please make a pull request and make sure things still pass after running `npm run test`
