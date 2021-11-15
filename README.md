# parcel-transformer-html-datasrc

[![Build Status](https://travis-ci.com/moritzlaube/parcel-transformer-html-datasrc.svg?branch=main)](https://travis-ci.com/moritzlaube/parcel-transformer-html-datasrc)
[![Coverage Status](https://coveralls.io/repos/github/moritzlaube/parcel-transformer-html-datasrc/badge.svg?branch=main)](https://coveralls.io/github/moritzlaube/parcel-transformer-html-datasrc?branch=main)

A Parcel V2 Plugin which enables `parcel js` to parse data-attributes that are widely used for lazy loading images with libraries such as `lozad.js` or `LazyLoad`.

Many thanks to Niklas Mischkulnig (`@mischnic`) who helped me setup the initial Parcel-Plugin code (<https://github.com/parcel-bundler/parcel/discussions/6405>).

## 🤔 Why you should use it?

The `parcel-transformer-html-datasrc` parses the HTML data-atributes which otherwise would remain untouched by Parcel.

_Without_ `parcel-transformer-html-datasrc`:

```html
<!-- before Parcel's build process -->
<img class="lazy" src="./images/lo-res-image.jpg" data-src="./images/hi-res-image.jpg" />
<!-- after Parcel's build process -->
<img class="lazy" src="/lo-res-image.<HASH>.jpg" data-src="./images/hi-res-image.jpg" />
```

_With_ `parcel-transformer-html-datasrc`:

```html
<!-- before Parcel's build process -->
<img class="lazy" src="./images/lo-res-image.jpg" data-src="./images/hi-res-image.jpg" />
<!-- after Parcel's build process -->
<img class="lazy" src="/lo-res-image.<HASH>.jpg" data-src="./images/hi-res-image.<HASH>.jpg" />
```

`parcel-transformer-html-datasrc` is currently supporting the following data-attributes:

- `data-src` on `img`-tags
- `data-srcset` on `img`-tags
- `data-srcset` on `source`-tags within a `picture`-tag
- `data-background-image` on `div`-tags
- `data-src`, or `your-custom-data-tag` on `img`, or `your-specified-html-element` -tags

Feel free to suggest more!

## 🛠 Usage

`npm i -D parcel-transformer-html-datasrc`

At the root of your project, next to your `package.json`, add a `.parcelrc` file and paste the following code:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.html": ["parcel-transformer-html-datasrc", "..."]
  }
}
```

To configure HTML elements with custom url attributes, at the root of your project, next to your `package.json` and your `.parcelrc` file, add a ` html-datasrc.config.json` file.

- Json keys represent HTML elements.

- Values have to be an array of strings that define corresponding custom data attributes.

```json
{
  "img": ["data-src", "data-bp", "your-custom-data-attribute"],
  "div": ["data-background-image"]
}
```

## 🤝 Contribution

This library is open source and depends on your input. Feel free to suggest improvements and/or contribute!

## License

MIT License

Copyright (c) 2021 Moritz Laube

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
