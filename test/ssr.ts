import { test } from '@substrate-system/tapzero'
import { html } from '../src/ssr.js'

test('server-side render', t => {
    const htmlString = html({
        alt: 'hello',
        width: 30,
        classes: 'ok',
        height: 30,
        placeholder: 'UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV',
        src: 'abc.jpg'
    })

    console.log('****', htmlString)

    t.ok(htmlString.includes('<blur-hash'), 'should include the custom element')
    t.ok(htmlString.includes('<canvas'), 'should include a canvas element')
    t.ok(htmlString.includes('blurry'),
        'should include an img with "blurry" class')
    t.ok(htmlString)
})
