import { test } from '@bicycle-codes/tapzero'
import { waitFor } from '@bicycle-codes/dom'
import '../src/index.js'

test('example', async t => {
    document.body.innerHTML += `
        <blur-hash
            class="test"
            width=30
            height=30
            src="/100.jpg"
            placeholder="UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV"
        ></blur-hash>
    `

    const el = await waitFor('blur-hash')

    t.ok(el, 'should find the element')
    t.ok(await waitFor('blur-hash canvas'), 'should contain a canvas')
})
