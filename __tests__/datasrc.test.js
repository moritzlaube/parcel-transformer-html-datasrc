// const path = require('path')
// const { default: Parcel } = require('@parcel/core')
// const { createWorkerFarm } = require('@parcel/core')
// const { NodeFS, MemoryFS } = require('@parcel/fs')

// const DIST_DIR = '/dist'

// ;(async () => {
//   const workerFarm = createWorkerFarm()
//   const inputFS = new NodeFS()
//   const outputFS = new MemoryFS(workerFarm)

//   await outputFS.mkdirp(DIST_DIR)
//   try {
//     const b = new Parcel({
//       entries: [path.join(__dirname, 'index.html')],
//       defaultConfig: require.resolve('@parcel/config-default'),
//       inputFS,
//       outputFS,
//       workerFarm,
//       defaultTargetOptions: {
//         engines: {
//           browsers: ['last 1 Chrome version'],
//           node: '12',
//         },
//         distDir: DIST_DIR,
//       },
//       patchConsole: false,
//       mode: 'development',
//     })

//     await b.run()

//     console.log(await outputFS.readdir(DIST_DIR))
//     for (const file of await outputFS.readdir(DIST_DIR)) {
//       console.log('---------', file, '---------')
//       console.log(await outputFS.readFile(path.join(DIST_DIR, file), 'utf8'))
//     }
//   } catch (e) {
//     console.error(e)
//   } finally {
//     await workerFarm.end()
//   }
// })()
