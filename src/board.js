const makeRows = (i, arr = []) => i === 0 ? arr : makeRows(i - 1, arr.concat([[]]))

const makeColumns = (i, arr) => i === 0 ? arr : makeColumns(i - 1, arr.concat(0))

const make = (r, c) => Object.freeze(makeRows(r).map(x => makeColumns(c, x)))

const renderBorder = (size, i = 0, x = '') => i === size ? x : x + renderBorder(size, i + 1, '*')

const renderLine = x => '*' + x.join('') + '*'

const render = x => x.map(x => renderLine(x)).join('\n')

module.exports = { make, renderBorder, render }