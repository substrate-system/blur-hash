import { test } from '@substrate-system/tapzero'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createString } from '../bin/index.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('Create the hash string', async t => {
    const hash = await createString(
        path.join(__dirname, '..', 'example', '100.jpg'),
    )

    t.equal(typeof hash, 'string', 'should return a string')
    t.equal(hash, 'UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV',
        'should return the expected string')
})
