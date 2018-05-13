const stdin = process.stdin
const rl = require('readline')

rl.emitKeypressEvents(stdin)
stdin.setRawMode(true)

let lastKey = null

stdin.on('keypress', (x, key) => {
  if(key.name === 'escape') process.exit(0)
  lastKey = key.name
})

const getLastkey = () => {
  const y = lastKey
  lastKey = null
  return y
}

module.exports = { getLastkey }