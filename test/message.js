import test from 'ava'
import { logic } from '../src/logic'

test(t => {
    return logic({ message: { content: 'chuck' } }).then(element => {
        t.true(element.message.content.length >= 6)
    })
})