const { Transformer } = require('@parcel/plugin')
const parser = require('posthtml-parser').default
const nullthrows = require('nullthrows')
const { render } = require('posthtml-render')
const semver = require('semver')
const PostHTML = require('posthtml')

module.exports = new Transformer({
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

  async transform({ asset }) {
    const ast = nullthrows(await asset.getAST())
    let isDirty
    PostHTML().walk.call(ast.program, node => {
      const { tag, attrs } = node
      if (!attrs) {
        return node
      }

      if ((tag === 'img' || tag === 'source') != null) {
        attrs['data-src'] = asset.addURLDependency(attrs['data-src'], {})
        isDirty = true
      }

      if ((tag === 'img' || tag === 'source') && attrs['data-srcset'] != null) {
        const srcsets = attrs['data-srcset'].split(',').map(item => {
          const [url, width] = item.trim().split(' ')
          return `${asset.addURLDependency(url)} ${width}`
        })
        attrs['data-srcset'] = srcsets.join(', ')
        isDirty = true
      }

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
