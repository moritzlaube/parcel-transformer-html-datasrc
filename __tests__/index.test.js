const parcel = require('../__mocks__/parcel')

const inputHtml = `<img src="/image1.jpg" alt="image src"><img src="/image1.jpg" data-src="/image2.jpg" alt="image data-src with lo-fi src">`

// parcel('src.html').then(data => {
//   const { input, output } = data
//   // console.log(input, output)
//   console.log(input.filter(node => node !== '\n').map(node => node.attrs))
//   console.log(output.filter(node => node !== '\n').map(node => node.attrs))
// })

// console.log(parcel('src.html').then(data => console.log(data)))

// test('the data is peanut butter', () => {
//   return parcel('src.html').then(data => {
//     const { input, output } = data
//     expect(input.filter(node => node !== '\n').map(node => node.attrs)).not.toEqual(
//       output.filter(node => node !== '\n').map(node => node.attrs)
//     )
//   })
// })

/* eslint-disable no-undef */

test('the data is peanut butter', () => parcel('src.html')
    .then(data => {
      expect(data).not.toEqual(inputHtml)
    })
    .catch(e => expect(e).toMatch('error')))

/* eslint-enable no-undef */

// test('the data is peanut butter', () => {
//   expect([
//     { src: './image1.jpg', alt: 'image src' },
//     {
//       src: './image1.jpg',
//       'data-src': './image2.jpg',
//       alt: 'image data-src with lo-fi src',
//     },
//   ]).not.toEqual([
//     { src: '/image1.5e57897a.jpg', alt: 'image src' },
//     {
//       src: '/image1.5e57897a.jpg',
//       'data-src': '/image2.413c237c.jpg',
//       alt: 'image data-src with lo-fi src',
//     },
//   ])
// })

// [
//       { src: './image1.jpg', alt: 'image src' },
//       {
//         src: './image1.jpg',
//         'data-src': './image2.jpg',
//         alt: 'image data-src with lo-fi src',
//       },
//     ]

//     [
//           { src: '/image1.5e57897a.jpg', alt: 'image src' },
//           {
//             src: '/image1.5e57897a.jpg',
//             'data-src': '/image2.413c237c.jpg',
//             alt: 'image data-src with lo-fi src',
//           },
//         ]
