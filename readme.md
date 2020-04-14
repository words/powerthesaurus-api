# powerthesaurus-api

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Look up English synonyms, antonyms, and more using
[`powerthesaurus.org`][powerthesaurus]: a crowdsourced corpus of nearly 80
million synonyms and 4 million antonyms.

## Install

[npm][]:

```sh
npm install powerthesaurus-api
```

## Use

```js
var thesaurus = require('powerthesaurus-api')

// Callbacks:
thesaurus('car', function(err, res) {
  if (err) throw err
  console.log(res)
})

// Promises and given a kind:
thesaurus('blue', 'antonyms').then(
  res => {
    console.log(res)
  },
  err => {
    throw err
  }
)
```

Yields:

```js
[
  {word: 'vehicle', parts: ['noun'], topics: ['carriage', 'transport']},
  {word: 'motorcar', parts: ['noun', 'adjective'], topics: ['vehicle']},
  {word: 'automobile', parts: ['noun', 'adjective'], topics: ['vehicle', 'transport']},
  {word: 'auto', parts: ['noun', 'adjective'], topics: ['transport', 'technology']},
  {word: 'railcar', parts: ['noun'], topics: []},
  // …and 45 more entries
]
[
  {word: 'happy', parts: ['adjective'], topics: ['characteristic', 'decency']},
  {word: 'lighthearted', parts: ['adjective'], topics: ['characteristic', 'happiness']},
  {word: 'joyful', parts: ['adjective'], topics: ['characteristic', 'happiness']},
  {word: 'upbeat', parts: ['adjective'], topics: ['characteristic', 'happiness']},
  {word: 'joyous', parts: ['adjective'], topics: ['characteristic', 'happiness']},
  // …and 45 more entries
]

```

## API

### `thesaurus(word[, kind][, callback])`

Look up words relating to `word`.

###### Parameters

*   `word` (`string`)
    — Word to look up
*   `kind` (`Kind`, default: `'synonyms'`)
    — Type of relation between looked up word and related words, can be:
    `'synonyms'`, `'antonyms'`, `'related'`, `'narrower'`, `'broader'`,
    `'sound_like'`, `'similar'`, or `'rhymes'`
*   `callback` (`Function`, optional)
    — Callback called when done.
    Returns a promise when not given

###### Returns

When given a callback, returns nothing and calls `callback` with either an
error or a [list of entries][entry].
When not given a callback, returns a `Promise`, that is either resolved with a
[list of entries][entry] or rejected with an error.
Up to 50 entries are found by `powerthesaurus-api`

### `Entry`

Object representing a related word, with the following fields:

*   `word` (`string`)
    does indeed relate to the looked up word
*   `parts` (`string[]`) — List of parts of speech of this entry.
    Can include `'adjective'`, `'adverb'`, `'conjunction'`, `'expression'`,
    `'idiom'`, `'interjection'`, `'noun'`, `'phrasal verb'`, `'pronoun'`,
    `'preposition'`, and/or `'verb'`
*   `topics` (`string[]`) — List of topics of this entry

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/words/powerthesaurus-api.svg

[build]: https://travis-ci.org/words/powerthesaurus-api

[coverage-badge]: https://img.shields.io/codecov/c/github/words/powerthesaurus-api.svg

[coverage]: https://codecov.io/github/words/powerthesaurus-api

[downloads-badge]: https://img.shields.io/npm/dm/powerthesaurus-api.svg

[downloads]: https://www.npmjs.com/package/powerthesaurus-api

[size-badge]: https://img.shields.io/bundlephobia/minzip/powerthesaurus-api.svg

[size]: https://bundlephobia.com/result?p=powerthesaurus-api

[license]: license

[author]: https://wooorm.com

[npm]: https://www.npmjs.com

[powerthesaurus]: https://www.powerthesaurus.org

[entry]: #entry
