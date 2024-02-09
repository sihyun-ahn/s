import React, { useState } from 'react'
import { Puzzle, Board } from './lib/Puzzle'

export default function App() {
  const [data, setData] = useState<Board>()

  const puzzle = new Puzzle(3, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9])

  const clickHandler = () => {
    const board = puzzle.createBoard()
    setData(board)
    console.log('operands', board.operands)
    console.log('operators', board.operators)
    console.log('results', board.results)
  }

  return (
    <div>
      <div>
        <h1>Cross Math Puzzle</h1>
        <p style={{ whiteSpace: 'pre' }}>
          {data?.operands || 'Click Create button to create a new puzzle!'}
        </p>
        <button onClick={clickHandler}>Create</button>
      </div>
    </div>
  )
}
