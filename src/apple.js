const make = (pos, level) => Object.freeze({
  x: pos.x,
  y: pos.y,
  level: level
})

const getTile = (apl, x, y, def) =>
  apl.x === x && apl.y === y ? apl.level : def

const render = (apl, brd) =>
  Object.freeze(brd.reduce((p, c, y) => {
    return p.concat([c.reduce((p, c, x) => {
      return p.concat([getTile(apl, x, y, c)])
    }, [])])
  }, []))

module.exports = { make, render }