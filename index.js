const { Transformer } = require('@parcel/plugin')
const parser = require('posthtml-parser').default
const nullthrows = require('nullthrows')
const { render } = require('posthtml-render')
const semver = require('semver')
const PostHTML = require('posthtml')
const _ = require('lodash')

// function customizer(objValue, srcValue) {
//   if (_.isArray(objValue)) {
//     return objValue.concat(srcValue)
//   }
// }

module.exports = new Transformer({
  async loadConfig({ config }) {
    const { contents } = (await config.getConfig(['html-datasrc.config.json'])) || {}
    return contents
  },

  canReuseAST({ ast }) {
    return ast.type === 'posthtml' && semver.satisfies(ast.version, '^0.4.0')
  },

  async parse({ asset }) {
    return {
      type: 'posthtml',
      version: '0.4.1',
      program: parser(await asset.getCode(), {
        lowerCaseAttributeNames: true,
      }),
    }
  },

  async transform({ config, asset, logger }) {
    // must add logger to transform like ({ config, asset, logger}) if compile console.logs are desired
    // logger.warn({ message: ` log message: ${config}` })

    const ast = nullthrows(await asset.getAST())
    let isDirty
    PostHTML().walk.call(ast.program, node => {
      const { tag, attrs } = node
      if (!attrs) {
        return node
      }
      // Default supported element and attribute pairs
      const elemAndAttributes = {
        div: ['data-bg', 'data-background-image', 'data-bg-hidpi', 'data-bg-multi'], // 'data-background-image-set' from lozad neds to be done
        iframe: ['data-src'],
        img: ['data-srcset', 'data-src', 'data-bp'],
        picture: ['data-iesrc'],
        source: ['data-src', 'data-srcset', 'srcset'],
        video: ['data-src', 'data-poster'],
      }

      // Optional user config file
      const customElemAndAttrsConfig = Object.keys(config).length === 0 ? undefined : config
      // Custom Attribute values filtered by current tag's attributes
      const customAttrsValuesFiltered = customElemAndAttrsConfig[tag]
        ? Object.values(customElemAndAttrsConfig[tag]).filter(item => Object.keys(attrs).includes(item))
        : undefined
      // logger.warn({ message: ` customAttrsfiltered: ${customAttrsValuesFiltered}` })

      const areMultipleFilteredValues = customAttrsValuesFiltered ? /,/.test(customAttrsValuesFiltered) : undefined
      const testObject = _.merge(elemAndAttributes, customElemAndAttrsConfig)
      // const secondObject = new Set(testObject)
      logger.warn({ message: ` testObject: ${Object.entries(testObject)}` })

      // const customAttr =
      //   customElemAndAttrsConfig[tag] && Array.isArray(customElemAndAttrsConfig[tag])
      //     ? customElemAndAttrsConfig[tag].find(item => Object.keys(attrs).includes(item))
      //     : customElemAndAttrsConfig[tag]
      //     ? customElemAndAttrsConfig[tag]
      //     : undefined
      const regexInsideParen = /(?<=url\().*(?=\))/
      // logger.warn({ message: ` tag: ${tag} \n attrs: ${regexInsideParen.test(Object.entries(attrs))}` })

      /*
       *  Adds url dependency to attributes such as below data-bg-multi that contain
       *  both multiple url() wrapped sources and other data
       *
       *   `<div
       *     class="lazy"
       *     data-bg-multi="
       *       url(lazy-head.jpg),
       *       url(lazy-body.jpg),
       *       linear-gradient(#fff, #ccc)"
       *   >...</div>`
       *
       */
      const addUrlAndGradientAttrsDependency = item => {
        const srcsets = attrs[item]
          .trim()
          .split(',')
          .map(el => {
            if (regexInsideParen.test(el)) {
              const url = el.match(regexInsideParen)
              const updatedUrl = asset.addURLDependency(url, {})
              // logger.warn({ message: `\n mapitem: ${el}\n url:${url}\n updatedUrl: ${updatedUrl}`})
              return el.replace(url, updatedUrl)
            }
            return el.trim()
          })
          .join(', ')
        attrs[item] = srcsets
      }

      if (areMultipleFilteredValues) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of customAttrsValuesFiltered) {
          if (attrs[item] != null && regexInsideParen.test(attrs[item])) {
            addUrlAndGradientAttrsDependency(item)
          }
        }
        isDirty = true
      }

      if (tag === 'img' && attrs['data-bp'] != null) {
        const srcsets = attrs['data-bp'].split(',').map(item => {
          const [url, width] = item.trim().split(' ')
          return width && url ? `${asset.addURLDependency(url)} ${width}` : asset.addURLDependency(url)
        })
        attrs['data-bp'] = srcsets.join(', ')
        isDirty = true
      }
      // if (
      //   !areMultipleFilteredValues &&
      //   customElemAndAttrsConfig &&
      //   tag in customElemAndAttrsConfig &&
      //   attrs[customAttrsValuesFiltered] != null
      // ) {
      //   attrs[customAttrsValuesFiltered] = asset.addURLDependency(attrs[customAttrsValuesFiltered], {})
      //   isDirty = true
      // }

      // if (tag === 'img' && attrs['data-srcset'] != null) {
      //   const srcsets = attrs['data-srcset'].split(',').map(item => {
      //     const [url, width] = item.trim().split(' ')
      //     return `${asset.addURLDependency(url)} ${width}`
      //   })
      //   attrs['data-srcset'] = srcsets.join(', ')
      //   isDirty = true
      // }

      if (tag === 'div' && attrs['data-background-image'] != null) {
        attrs['data-background-image'] = asset.addURLDependency(attrs['data-background-image'], {})
        isDirty = true
      }

      return node
    })

    if (isDirty) {
      asset.setAST(ast)
    }
    return [asset]
  },

  generate({ ast }) {
    return {
      content: render(ast.program),
    }
  },
})
