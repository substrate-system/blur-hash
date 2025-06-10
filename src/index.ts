import { WebComponent } from '@substrate-system/web-component'
import { decode } from 'blurhash'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'blur-hash': BlurHash
    }
}

export class BlurHash extends WebComponent.create('blur-hash') {
    time:number

    constructor () {
        super()
        // const srcset = this.getAttribute('srcset')
        const w = this.getAttribute('width')
        const h = this.getAttribute('height')
        const time = this.getAttribute('time')
        this.time = time ? parseInt(time) : 800

        this.style.width = '' + w
        this.style.height = '' + h

        document.body.style.setProperty('--blur-hash-time',
            time ? '.' + (parseInt(time) / 1000 + 's') : '0.8s')
    }

    /**
     * Change the image, and do the blur-up thing again.
     */
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
    ):void {
        if (attrs.width) this.style.width = attrs.width
        if (attrs.height) this.style.height = attrs.height

        const width = (attrs.width ?
            parseInt(attrs.width) :
            parseInt(this.style.width))
        const height = (attrs.height ?
            parseInt(attrs.height) :
            parseInt(this.style.height))

        this.innerHTML = BlurHash.html({
            srcset: attrs.srcset,
            w: '' + width,
            h: '' + height,
            src: newSrc,
            alt
        })

        const pixels = decode(placeholder, width, height)
        const canvas = this.querySelector('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')!
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)

        this.setAttribute('src', newSrc)
        this.setAttribute('placeholder', placeholder)

        const img = this.querySelector('img')!
        if (newSrcset) img.setAttribute('srcset', newSrcset)
        if (newSizes) img.setAttribute('sizes', newSizes)

        img.addEventListener('load', () => {
            canvas.style.display = 'none'
            img.classList.remove('blurry')
            img.classList.add('sharp')
        })
    }

    connectedCallback () {
        const width = parseInt(this.getAttribute('width') ?? '')
        const height = parseInt(this.getAttribute('height') ?? '')
        const placeholder = this.getAttribute('placeholder')
        if (!placeholder || !width || !height) {
            throw new Error('Missing attributes')
        }

        this.innerHTML = this.render()
        const pixels = decode(placeholder, width, height)
        const canvas = this.querySelector('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')!
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)

        const img = this.querySelector('img')!

        img.addEventListener('load', () => {
            canvas.style.display = 'none'
            img.classList.remove('blurry')
            img.classList.add('sharp')
        })
    }

    static html (attrs:{
        alt:string;
        srcset?:string|null;
        w?:string|null;
        h?:string|null;
        time?:number;
        contentVisibility?:'visible'|'auto'|'hidden'|null;
        decoding?:'sync'|'async'|'auto'|null;
        loading?:'lazy'|'eager'|'auto'|null;
        src:string;
    }) {
        const {
            srcset,
            w,
            h,
            alt,
            contentVisibility,
            decoding,
            loading,
            src
        } = attrs

        return `<canvas
            class="blurry"
            width=${w}
            height=${h}
        ></canvas>

        <img class="blurry"
            ${srcset ? `srcset="${srcset}"` : ''}
            alt="${alt}"
            content-visibility="${contentVisibility || 'auto'}"
            decoding="${decoding || 'async'}"
            loading="${loading || 'lazy'}"
            class="image-element blurry"
            src="${src}"
        />`
    }

    render ():string {
        const srcset = this.getAttribute('srcset')
        const w = this.getAttribute('width')
        const h = this.getAttribute('height')
        const time = this.getAttribute('time')
        this.time = time ? parseInt(time) : 800
        const src = this.getAttribute('src')
        const alt = this.getAttribute('alt')
        if (!src) throw new Error('Not src')
        if (!alt) throw new Error('Not alt')

        return BlurHash.html({ srcset, w, h, src, alt })
    }
}

customElements.define('blur-hash', BlurHash)
