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

        this.innerHTML = `<canvas>
        </canvas>`
    }

    // Define the attributes to observe
    // need this for `attributeChangedCallback`
    static observedAttributes = ['exmaple']

    /**
     * Handle [example] attribute changes
     *
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    handleChange_example (oldValue:string, newValue:string) {
        debug('handling change', oldValue, newValue)

        if (newValue === null) {
            // [example] was removed
        } else {
            // set [example] attribute
        }
    }

    /**
     * Runs when the value of an attribute is changed on the component
     * @param  {string} name     The attribute name
     * @param  {string} oldValue The old attribute value
     * @param  {string} newValue The new attribute value
     */
    attributeChangedCallback (name:string, oldValue:string, newValue:string) {
        this[`handleChange_${name}`](oldValue, newValue)
        debug('an attribute changed', name)
    }

    disconnectedCallback () {
        debug('disconnected')
    }

    connectedCallback () {
        debug('connected')
        const width = parseInt(this.getAttribute('width') ?? '')
        const height = parseInt(this.getAttribute('height') ?? '')
        const placeholder = this.getAttribute('placeholder')
        if (!placeholder || !width || !height) {
            throw new Error('Missing attributes')
        }

        const pixels = decode(placeholder, width, height)
        const ctx = (this.querySelector('canvas') as HTMLCanvasElement)
            .getContext('2d')
        const imageData = ctx!.createImageData(width, height)
        imageData.data.set(pixels)
    }
}

customElements.define('blur-hash', BlurHash)
