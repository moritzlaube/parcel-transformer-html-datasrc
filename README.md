# parcel-transformer-html-datasrc

A Parcel V2 Plugin which enables `parcel js` to parse data-attributes that are widely used for lazy loading images with libraries such as `lozad.js` or `LazyLoad`.

Many thanks to Niklas Mischkulnig (`@mischnic`) who helped me setup the initial Parcel-Plugin code.

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

## 🛠 Usage

`npm i -D parcel-transformer-html-datasrc`

At the root of your project, next to your `package.json`, add a `.parcelrc`file and paste the following code:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.html": ["parcel-transformer-html-datasrc", "..."]
  }
}
```
