module.exports = function votes (input) {
  // words that only have upvotes are sometimes rendered differently,
  // e.g. '9 votes up'
  var upOnly = input.match(/^(\d+) votes up$/)

  if (upOnly) {
    var up = Number(upOnly[1])
    var down = 0
  } else {
    var up = Number(input.match(/(\d+) ↑/)[1])
    var down = Number(input.match(/(\d+) ↓/)[1])
  }

  return {up: up, down: down}
}
