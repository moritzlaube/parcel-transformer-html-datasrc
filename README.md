# parcel-transformer-html-datasrc

A Parcel V2 Plugin which enables `parcel js` to parse data-attributes that are widely used for lazy loading images with libraries such as `lozad.js` or `LazyLoad`.

## 🤔 Why you should use it?

The `parcel-transformer-html-datasrc` parses the HTML data-atributes which otherwise would remain untouched by Parcel.

_Without_ `parcel-transformer-html-datasrc`:

```html
<!-- before Parcel's build process -->
<img class="lazy" src="./images/lo-res-image.jpg" data-src="./images/hi-res-image.jpg" />
<!-- after Parcel's build process -->
<img class="lazy" src="/lo-res-image.<HASH>.jpg" data-src="./images/hi-res-image.jpg" />
```

## 🛠 Usage
