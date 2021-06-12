const path = require('path')
// const parser = require('posthtml-parser').default

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */

const { NodeFS, MemoryFS } = require('@parcel/fs')

const defaultConfigFilePath = require.resolve('@parcel/config-default')
const Parcel = require('@parcel/core').default
const { createWorkerFarm } = require('@parcel/core')

const DIST_DIR = '/dist'
// const MOCK_DIR = '__mocks__'
// const ENTRY_FILE = 'index.html'

const parcel = async entry => {
  const workerFarm = createWorkerFarm()
  const inputFS = new NodeFS()
  const outputFS = new MemoryFS(workerFarm)

  await outputFS.mkdirp(DIST_DIR)

  try {
    const bundler = new Parcel({
      entries: [path.join(__dirname, entry)],
      defaultConfig: defaultConfigFilePath,
      defaultTargetOptions: {
        engines: {
          browsers: ['last 1 Chrome version'],
          node: '10',
        },
        distDir: DIST_DIR,
        shouldOptimize: false,
      },
      inputFS,
      outputFS,
      workerFarm,
      shouldPatchConsole: false,
      mode: 'production',
    })

    await bundler.run()
    // console.log('***INPUT***', await inputFS.readFile(path.join(MOCK_DIR, entry), 'utf8'))
    // console.log('***OUTPUT***', await outputFS.readFile(path.join(DIST_DIR, entry), 'utf8'))
    // console.log('***INPUT***', parser(await inputFS.readFile(path.join(MOCK_DIR, entry), 'utf8')))
    // console.log('***OUTPUT***', parser(await outputFS.readFile(path.join(DIST_DIR, entry), 'utf8')))
    // return {
    //   input: parser(await inputFS.readFile(path.join(MOCK_DIR, entry), 'utf8')),
    //   output: parser(await outputFS.readFile(path.join(DIST_DIR, entry), 'utf8')),
    // }
    return await outputFS.readFile(path.join(DIST_DIR, entry), 'utf8')
  } catch (error) {
    console.error(error)
  } finally {
    await workerFarm.end()
  }
}

module.exports = parcel
