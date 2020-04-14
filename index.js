var fetch = require('node-fetch')
var unified = require('unified')
var parse = require('rehype-parse')
var $ = require('hast-util-select')
var toString = require('hast-util-to-string')
var randomAgent = require('random-fake-useragent').getRandom

module.exports = lookup

var own = {}.hasOwnProperty
var base = 'https://www.powerthesaurus.org'

var kinds = [
  'synonyms',
  'antonyms',
  'related',
  'narrower',
  'broader',
  'sound_like',
  'similar',
  'rhymes'
]

var shortPartToPart = {
  'adj.': 'adjective',
  'adv.': 'adverb',
  'conj.': 'conjunction',
  'exp.': 'expression',
  'idi.': 'idiom',
  'int.': 'interjection',
  'n.': 'noun',
  'phr. v.': 'phrasal verb',
  'pr.': 'pronoun',
  'prep.': 'preposition',
  'v.': 'verb'
}

var processor = unified().use(parse)

function lookup(word, kind, callback) {
  if (typeof kind !== 'string') {
    callback = kind
    kind = 'synonyms'
  }

  if (!callback) {
    return new Promise(executor)
  }

  executor(null, callback)

  function executor(resolve, reject) {
    if (!kinds.includes(kind)) {
      return done(new Error('Unexpected invalid kind `' + kind + '`'))
    }

    fetch(base + '/' + encodeURIComponent(word) + '/' + kind, {
      headers: {'user-agent': randomAgent()}
    })
      .then(onresponse)
      .then(onbody, done)

    function onresponse(response) {
      return response.text()
    }

    function onbody(body) {
      var tree = processor.parse(body)
      done(null, $.selectAll('.pt-thesaurus-card', tree).map(each))
    }

    function done(err, results) {
      /* istanbul ignore if - site never seems to fail */
      if (err) {
        reject(err)
      } else if (resolve) {
        resolve(results)
      } else {
        callback(null, results)
      }
    }
  }

  function each(node) {
    var word = serialize($.select('.link--term', node))
    var rating = serialize($.select('.pt-list-rating__counter', node))
    var topics = $.selectAll('.link--topic', node).map(serialize)
    var parts = $.selectAll('.link--part', node).map(part).filter(Boolean)

    return {word, rating: parseInt(rating, 10), parts, topics}
  }

  function part(node) {
    var value = serialize(node)

    /* istanbul ignore if - this may happen in the future if they add more values */
    if (!own.call(shortPartToPart, value)) {
      console.warn('powerthesaurus: could not map `%s` to part', value)
      return
    }

    return shortPartToPart[value]
  }

  function serialize(node) {
    return toString(node).trim()
  }
}
