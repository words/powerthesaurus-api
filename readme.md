# powerthesaurus-api

Look up English synonyms using [powerthesaurus.org](https://powerthesaurus.org),
a crowdsourced corpus of nearly 20 million synonyms.

## Installation

```sh
npm install powerthesaurus-api --save
```

## Usage

```js
const thesaurus = require('powerthesaurus-api')

thesaurus('car')
  .then(results => {
    console.log(results)
  })
  .catch(error => {
    console.error(error)
  })
})
```

Returns a result set like this:

```js
[
  { word: 'vehicle', upVotes: 26, downVotes: 3 },
  { word: 'motorcar', upVotes: 23, downVotes: 3 },
  { word: 'automobile', upVotes: 24, downVotes: 6 },
  { word: 'machine', upVotes: 17, downVotes: 1 },
  { word: 'auto', upVotes: 21, downVotes: 6 },
  { word: 'truck', upVotes: 14, downVotes: 5 },
  { word: 'bus', upVotes: 11, downVotes: 3 },
  { word: 'gondola', upVotes: 10, downVotes: 2 },
  { word: 'motor', upVotes: 8, downVotes: 0 },
  { word: 'coach', upVotes: 10, downVotes: 3 },
  { word: 'jalopy', upVotes: 9, downVotes: 2 },
  { word: 'buggy', upVotes: 8, downVotes: 1 },
  { word: 'wagon', upVotes: 8, downVotes: 1 },
  { word: 'coupe', upVotes: 7, downVotes: 0 },
  { word: 'limousine', upVotes: 7, downVotes: 0 },
  { word: 'sedan', upVotes: 7, downVotes: 0 },
  { word: 'van', upVotes: 7, downVotes: 0 },
  { word: 'carriage', upVotes: 7, downVotes: 1 },
  { word: 'railcar', upVotes: 6, downVotes: 0 },
  { word: 'railway car', upVotes: 6, downVotes: 0 }
]
```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [cheerio](https://github.com/cheeriojs/cheerio): Tiny, fast, and elegant implementation of core jQuery designed specifically for the server
- [got](http://ghub.io/got): Simplified HTTP requests
- [pify](http://ghub.io/pify): Promisify a callback-style function
- [random-fake-useragent](https://github.com/koppthe/random-fake-useragent): Random useragent base on browser statistics from a real world database

## Dev Dependencies

- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers

## License

MIT
