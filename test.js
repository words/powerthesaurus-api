var test = require('tape')
var thesaurus = require('.')

test('powerthesaurus', function(t) {
  t.ok(typeof thesaurus === 'function', 'is a function')

  thesaurus('car')
    .then(results => {
      t.ok(results.length > 10, 'returns several results')

      results.forEach(result => {
        t.comment(result.word)
        t.ok(
          typeof result.word === 'string' && result.word.length,
          '`word` is a string'
        )
        t.ok(typeof result.rating === 'number', '`rating` is a number')
        t.ok(Array.isArray(result.parts), '`parts` is an array')
        t.ok(Array.isArray(result.topics), '`topics` is an array')
      })
      t.end()
    })
    .catch(error => {
      throw error
    })
})
