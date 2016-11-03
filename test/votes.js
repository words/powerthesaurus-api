const test = require('tape')
const votes = require('../lib/votes')

test('parseRating', function (t) {
  t.deepEqual(
    votes('13 votes: 10 ↑ - 3 ↓ = 7 rating'),
    {up: 10, down: 3},
    'supports positive ratings'
  )

  t.deepEqual(
    votes('4 votes: 0 ↑ - 4 ↓ = -4 rating'),
    {up: 0, down: 4},
    'supports negative ratings'
  )

  t.deepEqual(
    votes('7 votes up'),
    {up: 7, down: 0},
    'supports weird up-only ratings'
  )

  t.end()
})
