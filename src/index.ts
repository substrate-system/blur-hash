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
        const placeholder = this.getAttribute('placeholder')
        if (!placeholder) throw new Error('not placeholder')

        document.body.style.setProperty('--blur-hash-time',
            this.getAttribute('time') || '0.6s')

        this.innerHTML = `<canvas
            class="blurry"
            width=${this.getAttribute('width')}
            height=${this.getAttribute('height')}
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
            canvas.style.display = 'none'
            img.classList.remove('blurry')
            img.classList.add('sharp')
        })

        debug('the image', img)
    }
}

customElements.define('blur-hash', BlurHash)
