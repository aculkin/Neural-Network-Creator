let initialGrid = []

for (let i = 0; i < 56; i++) {
  initialGrid[i] = []
  for (let j = 0; j < 56; j++) {
    initialGrid[i][j] = 0
  }
}

const COLORIZE = 'COLORIZE'

export const colorize = (x, y) => ({type: COLORIZE, x, y})

export default function(grid = initialGrid, action) {
  switch (action.type) {
    case COLORIZE:
      const newGrid = [...grid]
      newGrid[action.x][action.y] = 1
      return newGrid
    default:
      return grid
  }
}
