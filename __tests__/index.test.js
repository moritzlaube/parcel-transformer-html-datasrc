const parcel = require('../__mocks__/parcel')

// const inputHtml = `<img src="/image1.jpg" alt="image src"><img src="/image1.jpg" data-src="/image2.jpg" alt="image data-src with lo-fi src">`
const inputHtml = `<img l-src="./image1.jpg" alt="image src"><img l-src="./image1.jpg" l-data-src="./image2.jpg" alt="image data-src with lo-fi src">`

// parcel('src.html').then(data => console.log(data))

/* eslint-disable no-undef */

test('the data is peanut butter', async () => {
  const outputHtml = await parcel('src.html')
  expect(outputHtml).toBe(inputHtml)
  // return parcel('src.html').then(outputHtml => {
  //   console.log(outputHtml)
  //   expect(outputHtml).not.toBe(inputHtml)
  // })
})

/* eslint-enable no-undef */
