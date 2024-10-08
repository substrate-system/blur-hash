# blur hash
![tests](https://github.com/substrate-system/icons/actions/workflows/nodejs.yml/badge.svg)
[![types](https://img.shields.io/npm/types/@substrate-system/icons?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This is the ["blur-up" image loading technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/), with the [blur-hash algorithm](https://blurha.sh/), as a [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

[See a live demonstration](https://substrate-system.github.io/blur-hash/)

> [!TIP]
> Throttle the internet speed with the dev tools.

<!-- toc -->

- [install](#install)
- [API](#api)
  * [ESM](#esm)
  * [Common JS](#common-js)
  * [attributes](#attributes)
- [CSS](#css)
  * [Import CSS](#import-css)
  * [variables](#variables)
- [use](#use)
  * [Bundler](#bundler)
  * [pre-built JS](#pre-built-js)
- [Create the string](#create-the-string)
  * [Print to system clipboard](#print-to-system-clipboard)

<!-- tocstop -->

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

### attributes
Takes the following attributes

#### time
The time for css transitions and animation. This is set as a CSS variable.

#### placeholder
The string created by the blurhash algorithm. See [node example](#create-the-string).

#### width & height
The dimensions for the image

## CSS

### Import CSS

```js
import '@substrate-system/blur-hash/css'
```

Or minified:
```js
import '@substrate-system/blur-hash/css/min'
```

### variables

__CSS variables__

* `--blur-hash-time` -- the transition time for animating blurry -> sharp,
  default is `0.8s`
* `--blur-hash-opactiy` -- the opacity to use for the placeholder image,
  default is `0.6`

## use
This calls the global function `customElements.define`. Just import, then use
the tag in your HTML.

### Bundler

#### JS
```js
import '@substrate-system/blur-hash'
```

#### HTML
```html
<div>
    <blur-hash
        time="0.6s"
        placeholder="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        src="..."
        width=100
        height=100
    >
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

## Create the string
This package includes a CLI tool to create the placeholder string. After installing this as a dependency,

```sh
npx blur ./my-file.jpg
```

Will print a string to stdout that can be used as a placeholder attribute.

### Print to system clipboard
On mac os,

```sh
npx blur ./my-file.jpg | pbcopy
```
