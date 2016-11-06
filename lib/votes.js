module.exports = function votes (input) {
  var up
  var down

  // words that only have upvotes are sometimes rendered differently,
  // e.g. '9 votes up'
  var upOnly = input.match(/^(\d+) votes up$/)

  if (upOnly) {
    up = Number(upOnly[1])
    down = 0
  } else {
    up = Number(input.match(/(\d+) ↑/)[1])
    down = Number(input.match(/(\d+) ↓/)[1])
  }

  return {up: up, down: down}
}
