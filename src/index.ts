import { WebComponent } from '@substrate-system/web-component'
import { decode } from 'blurhash'
import { html } from './ssr.js'

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'blur-hash': BlurHash
    }
}

export type ImgAttrs = {
    alt:string;
    width:string|number;
    height:string|number;
    placeholder:string;
    src:string;
    srcset?:string|null;
    sizes?:string|null;
    time?:number;
    contentVisibility?:'visible'|'auto'|'hidden'|null;
    decoding?:'sync'|'async'|'auto'|null;
    loading?:'lazy'|'eager'|'auto'|null;
}

export class BlurHash extends WebComponent.create('blur-hash') {
    time:number

    constructor () {
        super()
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
     * Will use the existing width & height if they are not passed in.
     */
    reset (attrs:(Omit<Omit<ImgAttrs, 'width'>, 'height'> & {
        width?:string|number;
        height?:string|number;
    })):void {
        if (attrs.width) this.style.width = '' + attrs.width
        if (attrs.height) this.style.height = '' + attrs.height

        const width = (attrs.width ?
            (typeof attrs.width === 'string' ? parseInt(attrs.width) : attrs.width) :
            parseInt(this.style.width))
        const height = (attrs.height ?
            (typeof attrs.height === 'string' ? parseInt(attrs.height) : attrs.height) :
            parseInt(this.style.height))

        this.innerHTML = BlurHash.html(Object.assign(attrs, { width, height }))

        const { placeholder, src: newSrc } = attrs

        const pixels = decode(placeholder, width, height)
        const canvas = this.querySelector('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')!
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)

        this.setAttribute('src', newSrc)
        this.setAttribute('placeholder', placeholder)

        const img = this.querySelector('img')!
        if (attrs.srcset) img.setAttribute('srcset', attrs.srcset)
        if (attrs.sizes) img.setAttribute('sizes', attrs.sizes)

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

        // don't render again if we dont have to
        if (!this.innerHTML) {
            this.innerHTML = this.render()
        }

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

    static html (attrs:ImgAttrs & { classes?:string }) {
        return html(attrs)
    }

    /**
     * Use the attributes to create HTML.
     */
    render ():string {
        const srcset = this.getAttribute('srcset')
        const width = this.getAttribute('width')
        const height = this.getAttribute('height')
        const time = this.getAttribute('time')
        const classes = this.classList.toString()
        const placeholder = this.getAttribute('placeholder')
        this.time = time ? parseInt(time) : 800
        const src = this.getAttribute('src')
        const alt = this.getAttribute('alt')
        if (!placeholder) throw new Error('not placeholder')
        if (!width || !height) throw new Error('not width or not height')
        if (!src) throw new Error('Not src')
        if (!alt) throw new Error('Not alt')

        return BlurHash.html({ classes, srcset, width, height, src, alt, placeholder })
    }
}
