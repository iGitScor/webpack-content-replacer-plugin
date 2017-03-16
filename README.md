<center>![Project logo][project-logo]</center>

# Webpack content replacer

[![Build Status][build-badge]][build]
[![codecov][codecoverage-badge]][codecoverage]
![Node dependency][node-badge]
[![Dependencies][dependencyci-badge]][dependencyci]
[![dependencies Status][dependencies-badge]][dependencies]
[![devDependencies Status][devDependencies-badge]][devDependencies]
[![MIT License][license-badge]][LICENSE]

> Replace content in file in webpack workflow

Edit file by replacing content at different build step in a webpack workflow.

_For example, you can change text color, text content or also insert configuration values from environment variables._

## Installing

```shell
npm i webpack-content-replacer-plugin
```

### Getting started in webpack

**Require `webpack-content-replacer-plugin`**
```javascript
var ContentReplacerWebpackPlugin = require('webpack-content-replacer-plugin')
```

Add the plugin to your plugin list
```javascript
var config = {
  plugins: [
    new ContentReplacerWebpackPlugin({
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

### Configuration

#### silent
Type: `Boolean`  
Default: `false`

Display/hide info logs during the build.

Example:
```javascript
var config = {
  plugins: [
    new ContentReplacerWebpackPlugin({
      silent: true,
      ...
      ],
    })
  ]
}
```

#### modifiedFile
Type: `String`  
Default: no default value
Required: true

Specify the file which will be modified.

Example:
```javascript
var config = {
  plugins: [
    new ContentReplacerWebpackPlugin({
      silent: true,
      modifiedFile: './build/index.html',
      ...
    })
  ]
}
```

#### modifications
Type: `Array<Modification>`  
Default: no default value
Required: true

Specify the modifications to be applied to the file.

Example:
```javascript
var config = {
  plugins: [
    new ContentReplacerWebpackPlugin({
      silent: true,
      modifiedFile: './build/index.html',
      [
        {
          regex: /text/g,
          modification: 'new text'
        }
      ],
      ...
    })
  ]
}
```

##### modification
Type: `Object`
Default: no default value
Required: true

Example:
```javascript
{
  regex: /text/g,
  modification: 'new text'
}
```

#### buildTrigger
Type: `String`
Default: `after-emit`
Allowed values: `after-emit`, `done`, `failed`

Specify webpack build step (c.f [plugin documentation](https://webpack.github.io/docs/plugins.html)).

Example:
```javascript
var config = {
  plugins: [
    new ContentReplacerWebpackPlugin({
      silent: true,
      modifiedFile: './build/index.html',
      [
        {
          regex: /text/g,
          modification: 'new text'
        }
      ],
      buildTrigger: 'done'
    })
  ]
}
```

## Developing

```shell
git clone https://github.com/{your fork}/webpack-content-replacer.git
cd webpack-content-replacer/
npm install
```

Replace `{your fork}` by your github username.

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. All contributions are welcome. Please make a pull request and make sure things still pass after running `npm test`

## Licensing

The code in this project is licensed under MIT license.

[project-logo]: https://raw.githubusercontent.com/iGitScor/webpack-content-replacer/master/logo.png
[build-badge]: https://img.shields.io/travis/iGitScor/webpack-content-replacer-plugin.svg?style=flat-square
[build]: https://travis-ci.org/iGitScor/webpack-content-replacer-plugin
[codecoverage-badge]: https://codecov.io/gh/iGitScor/webpack-content-replacer-plugin/branch/master/graph/badge.svg?style=flat-square
[codecoverage]: https://codecov.io/gh/iGitScor/webpack-content-replacer-plugin
[dependencyci-badge]: https://dependencyci.com/github/iGitScor/webpack-content-replacer-plugin/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/iGitScor/webpack-content-replacer-plugin
[dependencies-badge]: https://david-dm.org/iGitScor/webpack-content-replacer-plugin/status.svg?style=flat-square
[dependencies]: https://david-dm.org/iGitScor/webpack-content-replacer-plugin
[devDependencies-badge]: https://david-dm.org/iGitScor/webpack-content-replacer-plugin/dev-status.svg?style=flat-square
[devDependencies]: https://david-dm.org/iGitScor/webpack-content-replacer-plugin?type=dev
[node-badge]: https://img.shields.io/node/v/webpack-content-replacer-plugin.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/webpack-content-replacer-plugin.svg?style=flat-square
[license]: https://github.com/iGitScor/webpack-content-replacer-plugin/blob/master/LICENSE
