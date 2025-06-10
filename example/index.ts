/// <reference types="vite/client" />
import { qs } from '@substrate-system/dom'
import imgUrl from './100.jpg'
import llamas from './llamas.jpg'
import '../src/index.css'
import '../src/index.js'
import './example.css'

// the string from CLI for the 100 cat
// UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV

document.body.innerHTML += `
    <blur-hash
        width="400px"
        height="400px"
        placeholder="UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV"
        alt="demo image"
        src=${imgUrl}
    ></blur-hash>

    <hr />

    <div>
        <button>Reset image src</button>
    </div>
`

const btn = qs('button')?.addEventListener('click', ev => {
    ev.preventDefault()
    qs('blur-hash')?.reset(
        llamas,
        'some llamas',
        'UgI}q#%O%eNa?^I?awaf?aIVs*WBxZxaRjR*'
    )
})
