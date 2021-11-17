const { expect } = require('chai')
const parcel = require('../mock/parcel')

/* eslint-disable no-undef */
describe('#parcel()', () => {
  let output = []
  before(async () => {
    output = await (await parcel('src.html')).filter(node => node !== '\n')
  })

  it('should hash the "src" attribute\'s filename', () => {
    expect(output[0].attrs.src)
      .to.be.a('string')
      .that.matches(/^\/image.[a-f0-9]{8}.(jpg|jpeg|png|svg|webp)$/)
      .and.equal('/image.004da3dd.jpg')
  })

  it('should hash the "data-src" attribute\'s filename', () => {
    expect(output[1].attrs['data-src'])
      .to.be.a('string')
      .that.matches(/^\/image.[a-f0-9]{8}.(jpg|jpeg|png|svg|webp)$/)
      .and.equal('/image.004da3dd.jpg')
  })

  it('should hash the "data-srcset" attribute\'s filenames', () => {
    expect(output[2].attrs['data-srcset'])
      .to.be.a('string')
      .and.equal('/image.004da3dd.jpg 1000w, /image.004da3dd.jpg 2000w')
  })

  it('should hash the "data-background-image" attribute\'s filename', () => {
    expect(output[3].attrs['data-background-image'])
      .to.be.a('string')
      .that.matches(/^\/image.[a-f0-9]{8}.(jpg|jpeg|png|svg|webp)$/)
      .and.equal('/image.004da3dd.jpg')
  })

  it('should hash the source-tag\'s "data-srcset" attribute\'s filename', () => {
    expect(output[4].attrs['data-srcset']).to.be.a('string').and.equal('/image.004da3dd.jpg 1000w')
  })

  it('should hash the source-tag\'s "data-srcset" attribute\'s filename', () => {
    source = output[5].content.filter(node => node !== '\n')
    expect(source[1].attrs['data-srcset'])
      .to.be.a('string')
      .and.equal('/image.004da3dd.jpg 1x, /image.004da3dd.jpg 2x, /image.004da3dd.jpg 3x')
    expect(source[3].attrs['data-srcset']).to.be.a('string').and.equal('/image.004da3dd.jpg')
    expect(source[5].attrs['data-src']).to.be.a('string').and.equal('/image.004da3dd.jpg')
  })

  it('should hash the iframe\'s "data-src" attribute\'s filename', () => {
    expect(output[6].attrs['data-src'])
      .to.be.a('string')
      .that.matches(/^\/image.[a-f0-9]{8}.(jpg|jpeg|png|svg|webp)$/)
      .and.equal('/image.004da3dd.jpg')
  })

  it('should hash the div\'s "data-bg-multi" attribute\'s filename', () => {
    expect(output[7].attrs['data-bg-multi'])
      .to.be.a('string')
      .and.equal('url(/image.004da3dd.jpg), url(/image.004da3dd.jpg), linear-gradient(#fff, #ccc)')
  })
})

/* eslint-enable no-undef */
