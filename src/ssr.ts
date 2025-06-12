import { attributes } from '@substrate-system/util'
import type { ImgAttrs } from './index.js'

export function html (attrs:ImgAttrs & { classes?:string }) {
    const {
        width,
        height,
        alt,
        contentVisibility,
        placeholder,
        decoding,
        loading,
        srcset,
        sizes,
        src
    } = attrs

    if (!placeholder) throw new Error('not placeholder')

    const htmlString = `<canvas
        alt="${alt}"
        width=${width}
        height=${height}
        class="blurry"
        width=${width}
        height=${height}
    ></canvas>

    <img class="blurry"
        alt="${alt}"
        content-visibility="${contentVisibility || 'auto'}"
        decoding="${decoding || 'async'}"
        loading="${loading || 'lazy'}"
        ${srcset ? `srcset="${srcset}"` : ''}
        ${sizes ? `sizes=${sizes}` : ''}
        src="${src}"
    />`

    const attributeString = attributes(attrs)

    // running in node?
    return typeof window === 'undefined' ?
        `<blur-hash ${attributeString}>
            ${htmlString}
        </blur-hash>` :
        htmlString
}
