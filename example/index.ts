/// <reference types="vite/client" />
import imgUrl from './100.jpg'
import '../src/index.css'
import '../src/index.js'

// the string from node
// UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV

document.body.innerHTML += `
    <blur-hash
        width="750"
        height="600"
        placeholder="UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV"
        src=${imgUrl}
    ></blur-hash>
`
