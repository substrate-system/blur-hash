import { test } from '@substrate-system/tapzero'
import { html } from '../src/ssr.js'

test('server-side render', t => {
    const htmlString = html({
        alt: 'hello',
        width: 30,
        height: 30,
        placeholder: 'UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV',
        src: 'abc.jpg'
    })

    t.ok(htmlString.includes('<canvas'), 'should include a canvas element')
    t.ok(htmlString.includes('<img class="blurry'),
        'should include an img with blurry class')
    t.ok(htmlString)
})
