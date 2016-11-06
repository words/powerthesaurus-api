const test = require('tape')
const thesaurus = require('..')

test('powerthesaurus', function (t) {
  t.ok(typeof thesaurus === 'function', 'is a function')

  thesaurus('car')
    .then(results => {
      t.ok(results.length > 10, 'returns several results')

      results.forEach(result => {
        t.comment(result.word)
        t.ok(typeof result.word === 'string' && result.word.length, 'word is a string')
        t.ok(typeof result.upVotes === 'number', 'upVotes is a number')
        t.ok(typeof result.downVotes === 'number', 'downVotes is a number')
      })
      t.end()
    })
    .catch(error => {
      throw (error)
    })
})
