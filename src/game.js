const control = require('./control')
const Board = require('./board')
const Snake = require('./snake')

const ROWS = 20
const COLUMNS = 40

const draw = (board, border) => {
  console.log('\x1bc')
  console.log(new Date().getTime())
  console.log(border)
  console.log(board)
  console.log(border)
}

const input = (snake) => {
  const key = control.getLastkey()
  if(!key) return snake
  //if(key === 'right')
}

const loop = (brd, snk, apl, scr) => {
  const board = brd || Board.make(ROWS, COLUMNS)
  const snake = snk ||Snake.make(1, 1)
  const border = Board.renderBorder(COLUMNS + 2)

  const screen = Object.freeze(Snake.render(snake, board))

  draw(Board.render(screen), border)

  setTimeout(loop, 100, brd, Snake.move(input(snake), COLUMNS, ROWS), apl, scr)
}

loop()