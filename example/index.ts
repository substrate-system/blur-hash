/// <reference types="vite/client" />
import imgUrl from './100.jpg'
import '../src/index.css'
import '../src/index.js'
import './example.css'

// the string from CLI
// UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV

document.body.innerHTML += `
    <blur-hash
        width="400px"
        height="400px"
        placeholder="UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV"
        src=${imgUrl}
    ></blur-hash>
`
