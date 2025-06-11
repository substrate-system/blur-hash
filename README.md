# blur hash
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/blur-hash/nodejs.yml?style=flat-square)](https://github.com/substrate-system/blur-hash/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/blur-hash?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](https://common-changelog.org)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/blur-hash?cache-control=no-cache)](https://packagephobia.com/result?p=@substrate-system/blur-hash)
[![GZip size](https://flat.badgen.net/bundlephobia/minzip/@substrate-system/blur-hash?color=green)](https://bundlephobia.com/package/@substrate-system/blur-hash)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


This is the ["blur-up" image loading technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/),
with the [blur-hash algorithm](https://blurha.sh/), as a [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

[See a live demonstration](https://substrate-system.github.io/blur-hash/)

> [!TIP]
> Throttle the internet speed with the dev tools.

<!-- toc -->

- [install](#install)
- [Modules](#modules)
  * [ESM](#esm)
  * [Common JS](#common-js)
- [API](#api)
  * [attributes](#attributes)
  * [`.reset`](#reset)
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

## Modules

This exposes ESM and common JS via [package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/blur-hash'
```

### Common JS
```js
require('@substrate-system/blur-hash')
```

## API

### attributes
Takes the following attributes

#### time
The time for css transitions and animation. This is set as a CSS variable.

#### placeholder
The string created by the blurhash algorithm. See [node example](#create-the-string).

#### width & height
The dimensions for the image

### `.reset`

Change the image, and do the blur-up thing again.

```ts
reset (
    newSrc:string,
    alt:string,
    placeholder:string,
    newSrcset?:string|null,
    newSizes?:string|null,
    attrs:Partial<{
        srcset:string|null;
        width:string|null;
        height:string|null;
        time:number|null;
    }> = {}
):void
```

#### example

```js
document.querySelector('blur-hash')?.reset(
    'llamas.jpg',
    'some llamas',
    'UgI}q#%O%eNa?^I?awaf?aIVs*WBxZxaRjR*'
)
```

-------------------------------------------------


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
  default is `0.2`

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

### JS API

```js
import { createString } from '@substrate-system/blur-hash'


```

### CLI
This package includes a CLI tool to create the placeholder string. After
installing this as a dependency,

```sh
npx blur ./my-file.jpg
```

Will print a string to stdout that can be used as a placeholder attribute.

#### Print to system clipboard
On mac os,

```sh
npx blur ./my-file.jpg | pbcopy
```
