import { test } from '@substrate-system/tapzero'
import { fork } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('cli script', async t => {
    t.plan(1)

    const child = fork(
        path.join(__dirname, '..', 'dist', 'bin', 'index.js'),
        [path.join(__dirname, '..', 'example', '100.jpg')],
        { stdio: 'pipe' }
    )

    return new Promise((resolve) => {
        child.stdout?.on('data', data => {
            t.equal('' + data, 'UHGIM_X900xC~XWFE0xt00o3%1oz-;t7i|IV\n',
                'should get the expected string from the example image')
        })

        child.on('close', resolve)
    })
})
