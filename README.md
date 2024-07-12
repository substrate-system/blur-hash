# package name here
![tests](https://github.com/substrate-system/icons/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/icons?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg?style=flat-square)](package.json)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This is the ["blur-up" image loading technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/), with the [blur-hash algorithm](https://blurha.sh/), as a [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

[See a live demo](https://substrate-system.github.io/blur-hash/)

## install

```sh
npm i -S @substrate-system/blur-hash
```

## API

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/blur-hash'
```

### Common JS
```js
require('@substrate-system/blur-hash')
```

## CSS

### Import CSS

```js
import '@substrate-system/blur-hash/css'
```

Or minified:
```js
import '@substrate-system/blur-hash/css/min'
```

### Customize CSS via some variables

```css
blur-hash {
    --example: pink;
}
```

## use
This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### JS
```js
import '@substrate-system/blur-hash'
```

### HTML
```html
<div>
    <blur-hash placeholder="LEHV6nWB2yk8pyo0adR*.7kCMdnj" src="...">
    </blur-hash>
</div>
```

### pre-built JS
This package exposes minified JS files too. Copy them to a location that is
accessible to your web server, then link to them in HTML.

#### copy
```sh
cp ./node_modules/@substrate-system/blur-hash/dist/blur-hash.min.js ./public
```

#### HTML
```html
<script type="module" src="./blur-hash.min.js"></script>
```
