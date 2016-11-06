const URL = require('url')
const got = require('got')
const pify = require('pify')
const cheerio = require('cheerio')
const randomAgent = require('random-fake-useragent').getRandom
const votes = require('./lib/votes')

function lookup (word, callback) {
  var url = URL.format({
    protocol: 'https:',
    hostname: 'www.powerthesaurus.org',
    pathname: word
  })

  const requestOpts = {
    headers: {'user-agent': randomAgent()}
  }

  got(url, requestOpts)
    .then(response => {
      var $ = cheerio.load(response.body)
      var results = $('tr.theentry').map((i, el) => {
        var v = votes($(el).find('.rating').attr('title'))

        return {
          word: $(el).find('td.abbdef a').first().text(),
          upVotes: v.up,
          downVotes: v.down
        }
      }).get()
      return callback(null, results)
    })
    .catch(error => {
      return callback(error)
    })
}

module.exports = pify(lookup)
