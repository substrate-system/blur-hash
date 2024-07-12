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

        debug('src', this.getAttribute('src'))

        // this.innerHTML = `<img
        //     ${srcset ? `srcset="${srcset}"` : ''}
        //     alt="${this.getAttribute('alt')}"
        //     content-visibility="${this.getAttribute('content-visibility') || 'auto'}"
        //     decoding="${this.getAttribute('decoding') || 'async'}"
        //     loading="${this.getAttribute('loading') || 'lazy'}"
        //     class="image-element blurry"
        //     style="background-size: cover; background-image: url('${placeholder}')"
        //     src="${this.getAttribute('src')}"
        // />`

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
            style="background-size: cover; background-image: url('${placeholder}')"
            src="${this.getAttribute('src')}"
        />
        `
    }

    // Define the attributes to observe
    // need this for `attributeChangedCallback`
    // static observedAttributes = ['exmaple']

    // /**
    //  * Handle [example] attribute changes
    //  *
    //  * @param  {string} oldValue The old attribute value
    //  * @param  {string} newValue The new attribute value
    //  */
    // handleChange_example (oldValue:string, newValue:string) {
    //     debug('handling change', oldValue, newValue)

    //     if (newValue === null) {
    //         // [example] was removed
    //     } else {
    //         // set [example] attribute
    //     }
    // }

    // /**
    //  * Runs when the value of an attribute is changed on the component
    //  * @param  {string} name     The attribute name
    //  * @param  {string} oldValue The old attribute value
    //  * @param  {string} newValue The new attribute value
    //  */
    // attributeChangedCallback (name:string, oldValue:string, newValue:string) {
    //     this[`handleChange_${name}`](oldValue, newValue)
    //     debug('an attribute changed', name)
    // }

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
        debug('the image', img)
        debug('img.complete', img.complete)

        img.addEventListener('load', () => {
            debug('loaded')
            canvas.style.display = 'none'
            img.classList.remove('blurry')
            img.classList.add('sharp')
        })
    }
}

customElements.define('blur-hash', BlurHash)
