const control = require('./control')
const Board = require('./board')
const Snake = require('./snake')
const Apple = require('./apple')

const ROWS = 20
const COLUMNS = 40

const draw = (board, border) => {
  console.log('\x1bc')
  console.log(border)
  console.log(board)
  console.log(border)
}

const input = (snake) => {
  const key = control.getLastkey()
  const turn = Snake.turn
  if(!key) return snake
  if(key === 'right') return turn(1, 0, snake)
  if(key === 'left') return turn(-1, 0, snake)
  if(key === 'up') return turn(0, -1, snake)
  if(key === 'down') return turn(0, 1, snake)
  return snake
}

const getSpawnPoint = (x, y, w, h) => ({
  x: w - x,
  y: h - y
})

const collision = ([snk], apl) => snk.x === apl.x && snk.y === apl.y

const loop = (brd, snk, apl, scr) => {
  const board = brd || Board.make(ROWS, COLUMNS)
  const snake = snk ||Snake.make(2, 2)
  const spawn = getSpawnPoint(snake[0].x, snake[0].y, COLUMNS - 1, ROWS - 1)
  const apple = apl || Apple.make(spawn, 1)
  const border = Board.renderBorder(COLUMNS + 2)

  const snakeBoard = Snake.render(snake, board)
  const screen = Apple.render(apple, snakeBoard)

  draw(Board.render(screen), border)

  setTimeout(
    loop,
    100, 
    brd, 
    Snake.move(input(snake), COLUMNS, ROWS), 
    collision(snake, apple) ? Apple.make(spawn, apple.level + 1): apple, 
    scr)
}

module.exports = loop