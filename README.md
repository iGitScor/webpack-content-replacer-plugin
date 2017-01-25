# Webpack content replacer

Replace content in file in webpack workflow

[![Build Status](https://travis-ci.org/iGitScor/webpack-content-replacer-plugin.svg?branch=master)](https://travis-ci.org/iGitScor/webpack-content-replacer-plugin)
[![dependencies Status](https://david-dm.org/iGitScor/webpack-content-replacer-plugin/status.svg)](https://david-dm.org/iGitScor/webpack-content-replacer-plugin)
[![devDependencies Status](https://david-dm.org/iGitScor/webpack-content-replacer-plugin/dev-status.svg)](https://david-dm.org/iGitScor/webpack-content-replacer-plugin?type=dev)

## Install Instructions

```bash
$ npm i webpack-content-replacer-plugin
```
Note: This plugin needs NodeJS >= 6

## Usage Instructions

**Require `webpack-content-replacer-plugin`**
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

- `silent` _(bool)_: Display/hide info logs
- `modifiedFile` _(string)_: File to be modified
- `modifications` _(string)_: Array of modifications' object having regex and modification property
- `buildTrigger` _(string)_: Webpack build step (c.f [plugin documentation](https://webpack.github.io/docs/plugins.html)). See below accepted steps:
  - `after-emit`
  - `done`
  - `failed`

Call at specific step
```javascript
var config = {
  plugins: [
    new ContentReplacer({
      buildTrigger: 'after-emit',
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

Use silent mode
```javascript
var config = {
  plugins: [
    new ContentReplacer({
      silent: true,
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

### Contributing

All contributions are welcome. Please make a pull request and make sure things still pass after running `npm test`
