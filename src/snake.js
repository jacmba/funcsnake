const make = (x, y) => Object.freeze([{
  x: x,
  y: y,
  dx: 1,
  dy: 0
}])

const isLocated = (x, y, [head, ...tail]) => {
  if(!head) return false
  if(head.x === x && head.y === y) return true
  return isLocated(x, y, tail)
}

const move = (x, maxX, maxY) => x.map(x => ({
  x: x.x < maxX ? (x.x >= 0 ? x.x + x.dx : maxX - 1) : 0,
  y: x.y < maxY ? (x.y >= 0 ? x.y + x.dy : maxY - 1) : 0,
  dx: x.dx,
  dy: x.dy
}))

const turn = (x, y, [head, ...tail]) => {
  return [{
    x: head.x,
    y: head.y,
    dx: x,
    dy: y
  }]
}

const render = (snk, brd) =>
  Object.freeze(brd.reduce((p, c, x) => {
    return p.concat([c.reduce((p, c, y) => {
      if(isLocated(y, x, snk)) return p.concat(['O'])
      return p.concat([' '])
    }, [])])
  }, []))

module.exports = { make, render, move, turn }