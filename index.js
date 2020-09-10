var fetch = require('node-fetch')
var unified = require('unified')
var parse = require('rehype-parse')
var $ = require('hast-util-select')
var toString = require('hast-util-to-string')

module.exports = lookup

var agent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'

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
  'phr.': 'phrase',
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
      headers: {'user-agent': agent}
    })
      .then(onresponse)
      .then(onbody, done)

    function onresponse(response) {
      return response.text()
    }

    function onbody(body) {
      var tree = processor.parse(body)
      done(null, $.selectAll('main .k3_b', tree).map(each))
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
    var links = $.selectAll('a', node)
    var serialized = links.map(serialize)
    var word = serialized.shift()
    var topics = serialized.filter((d) => !/\.$/.test(d))
    var parts = serialized.filter((d) => /\.$/.test(d)).map(part)
    return {word, parts, topics}
  }

  function part(value) {
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
