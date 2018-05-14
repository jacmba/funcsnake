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

const move = (x, maxX, maxY) => x.reduce((p, x, i, xs) => { 
  if (i === 0) return Object.freeze([{
    x: x.x < maxX ? (x.x >= 0 ? x.x + x.dx : maxX - 1) : 0,
    y: x.y < maxY ? (x.y >= 0 ? x.y + x.dy : maxY - 1) : 0,
    dx: x.dx,
    dy: x.dy
  }])

  const last = xs[i - 1]
  return Object.freeze(p.concat([{
    x: last.x,
    y: last.y,
    dx: last.dx,
    dy: last.dy
  }]))
}, [])

const turn = (x, y, [head, ...tail]) => {
  if(!head) return []
  return Object.freeze([{
    x: head.x,
    y: head.y,
    dx: x,
    dy: y
  }].concat(turn(head.dx, head.dy, tail)))
}

const getTile = (x, y, snk) => isLocated(x, y, snk) ? 'O' : ' '

const render = (snk, brd) =>
  Object.freeze(brd.reduce((p, c, y) => {
    return p.concat([c.reduce((p, c, x) => p.concat([getTile(x, y, snk)]), [])])
  }, []))

const grow = (snk) => {
  const tail = snk[snk.length - 1]
  return Object.freeze(snk.concat([{
    x: tail.x + tail.dx,
    y: tail.y + tail.dy,
    dx: tail.dx,
    dy: tail.dy
  }]))
}

const collision = ([head, ...tail]) => {
  const f = ([bodyHead, ...bodyTail]) => {
    if(!bodyHead) return false
    if(head.x === bodyHead.x && head.y === bodyHead.y) return true
    return f(bodyTail)
  }
  return f(tail)
}

module.exports = { make, render, move, turn, grow, collision }