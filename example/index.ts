/// <reference types="vite/client" />
import { qs } from '@substrate-system/dom'
import imgUrl from './100.jpg'
import llamas from './llamas.jpg'
import { BlurHash } from '../src/index.js'
import '../src/index.css'
import './example.css'

BlurHash.define()

// the string from CLI for the 100 cat
// UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV

document.body.innerHTML += `
    <blur-hash
        width="400px"
        height="400px"
        placeholder="UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV"
        alt="cool cat"
        src=${imgUrl}
    ></blur-hash>

    <hr />

    <div>
        <button>Reset image src</button>
    </div>
`

qs('button')?.addEventListener('click', ev => {
    ev.preventDefault()
    qs('blur-hash')?.reset({
        src: llamas,
        alt: 'some llamas',
        placeholder: 'UgI}q#%O%eNa?^I?awaf?aIVs*WBxZxaRjR*'
    })
})
