const {expect} = require('chai')
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
      .and.equal('/image.5e57897a.jpg')
  })

  it('should hash the "data-src" attribute\'s filename', () => {
    expect(output[1].attrs['data-src'])
      .to.be.a('string')
      .that.matches(/^\/image.[a-f0-9]{8}.(jpg|jpeg|png|svg|webp)$/)
      .and.equal('/image.5e57897a.jpg')
  })
})

/* eslint-enable no-undef */