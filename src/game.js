const control = require('./control')
const Board = require('./board')
const Snake = require('./snake')
const Apple = require('./apple')

const ROWS = 20
const COLUMNS = 40
const DELTATIME = 200

const draw = (board, border, level) => {
  console.log('\x1bc')
  console.log('LEVEL', level)
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

const gameOver = x => {
  console.log()
  console.log('GAME OVER !!!')
  console.log('Be proud you reached level', x)
  console.log()
  process.exit(0)
}

const getDeltaTime = (x, y) => x - y * 4

const loop = (brd, snk, apl, scr) => {
  const board = brd || Board.make(ROWS, COLUMNS)
  const snake = snk ||Snake.make(2, 2)
  const spawn = getSpawnPoint(snake[0].x, snake[0].y, COLUMNS - 1, ROWS - 1)
  const apple = apl || Apple.make(spawn, 1)
  const border = Board.renderBorder(COLUMNS + 2)

  const snakeBoard = Snake.render(snake, board)
  const screen = Apple.render(apple, snakeBoard)

  draw(Board.render(screen), border, apple.level)
  const collided = collision(snake, apple)

  if(Snake.collision(snake)) return gameOver(apple.level)

  setTimeout(
    loop,
    getDeltaTime(DELTATIME, apple.level), 
    brd, 
    Snake.move(input(collided ? Snake.grow(snake) : snake), COLUMNS, ROWS), 
    collided ? Apple.make(spawn, apple.level + 1): apple, 
    scr)
}

module.exports = loop