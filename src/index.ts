import { createDebug } from '@bicycle-codes/debug'
const debug = createDebug()

// for docuement.querySelector
declare global {
    interface HTMLElementTagNameMap {
        'example-element': Example
    }
}

export class Example extends HTMLElement {
    constructor () {
        super()

        this.innerHTML = `<div>
            <p>example</p>
            <ul>
                ${Array.from(this.children).filter(Boolean).map(node => {
                    return `<li>${node.outerHTML}</li>`
                }).join('')}
            </ul>
        </div>`
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
        debug('handling example change', oldValue, newValue)

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

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    debug('Node added: ', mutation.addedNodes)
                }
            })
        })

        observer.observe(this, { childList: true })
    }
}

customElements.define('example-component', Example)
