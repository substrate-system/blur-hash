import type { ImgAttrs } from './index.js'

export function html (attrs:ImgAttrs) {
    const {
        width,
        height,
        alt,
        contentVisibility,
        decoding,
        loading,
        srcset,
        sizes,
        src
    } = attrs

    return `<canvas
        class="blurry"
        width=${width}
        height=${height}
    ></canvas>

    <img class="blurry"
        alt="${alt}"
        content-visibility="${contentVisibility || 'auto'}"
        decoding="${decoding || 'async'}"
        loading="${loading || 'lazy'}"
        class="image-element blurry"
        ${srcset ? `srcset="${srcset}"` : ''}
        ${sizes ? `sizes=${sizes}` : ''}
        src="${src}"
    />`
}
