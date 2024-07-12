import { test } from '@bicycle-codes/tapzero'
import { waitFor } from '@bicycle-codes/dom'
import '../src/index.js'

test('example', async t => {
    document.body.innerHTML += `
        <blur-hash
            class="test"
        >
        </blur-hash>
    `

    const el = await waitFor('example-component')

    t.ok(el, 'should find an element')
})
