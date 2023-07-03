const util = require('util');
const glob = util.promisify(require('glob'));
const path = require('path');
const log = require('picocolors')
const { writeFileSync } = require('node:fs')

class UnusedFilesWebpackPlugin {
  options;
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tap('UnusedFilesWebpackPlugin', async (compilation) => {
      const userOptions = { ...defaultOptions, ...this.options }
      const { output } = userOptions
      const unusedAssets = await findUnusedAssets(compilation, userOptions)
      const classificationFiles = classificationFile(unusedAssets, userOptions)
      setFile(classificationFiles, output)
    });
  }
}

const defaultOptions = {
  path: './src',
  output: './unused-files.json',
  exclude: []
}

async function findUnusedAssets(compilation, options) {
  const { path } = options
  const pattern = `${path}/**/*`
  const allFiles = await getAllFiles(pattern)
  const dependFiles = getDependFiles(compilation)
  return allFiles.filter(item => !dependFiles.includes(item));
}


async function getAllFiles(pattern) {
  try {
    const patternFiles = await glob(pattern, { nodir: true });
    return patternFiles.map(item => path.resolve(item))
  } catch (error) {
    console.log('getAllFiles Error:', error);
  }
}

function getDependFiles(compilation) {
  const { fileDependencies } = compilation
  const dependFiles = []
  fileDependencies.forEach(item => {
    if (!item.includes('node_modules')) {
      dependFiles.push(item)
    }
  })
  return dependFiles
}


function setFile(data, name = './unused-files.json') {
  writeFileSync(name, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      log.red(`${name} 文件写入失败`)
    }
  })
}

function classificationFile(files, options) {
  const { exclude } = options
  const classifiedFiles = {};
  files.forEach((file) => {
    const extname = path.extname(file)
    if (!exclude.includes(extname)) {
      if (classifiedFiles[extname]) {
        classifiedFiles[extname].push(file);
      } else {
        classifiedFiles[extname] = [file];
      }
    }
  });
  return classifiedFiles
}

module.exports = UnusedFilesWebpackPlugin;