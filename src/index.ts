import { decode } from 'blurhash'
import { createDebug } from '@bicycle-codes/debug'
const debug = createDebug()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'blur-hash': BlurHash
    }
}

export class BlurHash extends HTMLElement {
    constructor () {
        super()
        const srcset = this.getAttribute('srcset')
        const w = this.getAttribute('width')
        const h = this.getAttribute('height')

        this.style.width = '' + w
        this.style.height = '' + h

        document.body.style.setProperty('--blur-hash-time',
            this.getAttribute('time') || '0.8s')

        this.innerHTML = `<canvas
            class="blurry"
            width=${w}
            height=${h}
        ></canvas>
        <img class="blurry"
            ${srcset ? `srcset="${srcset}"` : ''}
            alt="${this.getAttribute('alt')}"
            content-visibility="${this.getAttribute('content-visibility') || 'auto'}"
            decoding="${this.getAttribute('decoding') || 'async'}"
            loading="${this.getAttribute('loading') || 'lazy'}"
            class="image-element blurry"
            src="${this.getAttribute('src')}"
        />
        `
    }

    connectedCallback () {
        const width = parseInt(this.getAttribute('width') ?? '')
        const height = parseInt(this.getAttribute('height') ?? '')
        const placeholder = this.getAttribute('placeholder')
        if (!placeholder || !width || !height) {
            throw new Error('Missing attributes')
        }

        const pixels = decode(placeholder, width, height)
        const canvas = this.querySelector('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')!
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)

        const img = this.querySelector('img')!

        img.addEventListener('load', () => {
            debug('loaded')
            canvas.style.opacity = '0'
            img.classList.remove('blurry')
            img.classList.add('sharp')
        })
    }
}

customElements.define('blur-hash', BlurHash)
