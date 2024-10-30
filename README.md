<h1 align="center">unused-assets-webpack-plugin</h1>
<p align="center">Find whether there are unused assets in the project</p>

[简体中文](./READM-ZH.md)

## Configuration Options

| **Configuration Option Name** | **Required** | **Meaning**           | **Default Value** | **Type**  |
| -------------- | ------------ | --------           | ---------- | --------  |
| `path`    | No           | The resource path to search |./src        | `string`  |
| `output`    | No           | The output file path |./unused-files.json   |`string` |
| `exclude`    | No           | The file types to exclude | []      | `string[]` |

## [Installation](https://www.npmjs.com/package/unused-assets-webpack-plugin)

```bash
npm install unused-assets-webpack-plugin -D
// or
pnpm add unused-assets-webpack-plugin -D
```

## Usage

- vue.config.js

```js
const UnusedAssetsWebpackPlugin = require('unused-assets-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new UnusedAssetsWebpackPlugin()]
  }
}
```
