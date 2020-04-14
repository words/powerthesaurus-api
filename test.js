var assert = require('assert')
var test = require('tape')
var thesaurus = require('.')

test('powerthesaurus', function (t) {
  t.ok(typeof thesaurus === 'function', 'is a function')

  t.test('promises', function (t) {
    t.plan(1)

    thesaurus('car')
      .then(checkResults(t, 'should have valid results'))
      .catch(t.ifError)
  })

  t.test('callbacks', function (t) {
    t.plan(2)

    thesaurus('blue', function (err, results) {
      t.ifError(err, 'should not give an error')
      checkResults(t, 'should have valid results')(results)
    })
  })

  t.test('kind', function (t) {
    t.plan(1)

    thesaurus('great', 'antonyms')
      .then(checkResults(t, 'should have valid results'))
      .catch(t.ifError)
  })

  t.test('invalid kind', function (t) {
    t.plan(1)

    thesaurus('value', 'kind').catch(function (error) {
      t.ok(/Unexpected invalid kind `kind`/.test(error), 'should pass an error')
    })
  })
})

function checkResults(t, message) {
  return check

  function check(results) {
    t.doesNotThrow(function () {
      assert.ok(results.length > 10, 'returns several results')
      results.forEach(each)
    }, message)
  }

  function each(d) {
    var word = d.word
    assert.ok(typeof word === 'string' && word.length, '`word` is a string')
    assert.ok(Array.isArray(d.parts), '`' + word + '.parts` is an array')
    assert.ok(Array.isArray(d.topics), '`' + word + '.topics` is an array')
  }
}
