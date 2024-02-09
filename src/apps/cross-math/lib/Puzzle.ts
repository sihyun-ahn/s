/*
 * Board represents a complete (possibly incomplete) instance of a cross math puzzle. It contains
 * the operators and the results of the operations for each row and column, and the operand
 * numbers, which is the correct answers for the puzzle.
 *
 * Example
 * A corresponding Board for a cross math puzzle
 *     3 + 8 - 2 = 9
 *     +   /   *
 *     5 * 4 + 3 = 23
 *     =   =   =
 *     8   2   6
 * is exampleBoard, a constant delcared below.
 *
 * TODO: Please richen its structure, it's so naive now! As long as operands, Operators, and the
 * results are semantically distinct, feel free to modify Board to make it easier for you to
 * implement Puzzle.
 */
export enum Operator {
  Plus = '+',
  Minus = '-',
  Div = '/',
  Mul = '*',
  Null = ' ',
}

interface Results {
  rowResult: number[]
  colResult: number[]
}

export interface Board {
  operands: number[][]
  operators: Operator[][]
  results: Results
}

// export interface BoardRequirement extends Omit<Board, 'results'> {}

export interface BoardRequirement {
  operands: number[][]
  operators: Operator[][]
}

const exampleBoard: Board = {
  operands: [
    [3, 8, 2],
    [5, 4, 3],
  ],
  operators: [
    [Operator.Plus, Operator.Minus, Operator.Null],
    [Operator.Plus, Operator.Div, Operator.Mul],
    [Operator.Mul, Operator.Plus, Operator.Null],
  ],
  results: {
    rowResult: [9, 23],
    colResult: [8, 2, 6],
  },
}

function getRandOperator(): Operator {
  const opArray = Object.values(Operator).filter(op => op !== Operator.Null)
  const randIdx = Math.floor(Math.random() * opArray.length)
  return opArray[randIdx] as Operator
}

function computeRes(op1: number, op2: number, operator: Operator): number {
  switch (operator) {
    case Operator.Plus:
      return op1 + op2
    case Operator.Minus:
      return op1 - op2
    case Operator.Div:
      return op1 / op2
    case Operator.Mul:
      return op1 * op2
    default:
      return 0
  }
}

/*
 * Puzzle implements a controller that configure options for a cross math puzzle, generate a new
 * instance, and provide undo and redo functions.
 */
class Puzzle {
  /*
   * Represents the number of columns of the operands.
   *
   * For example, exampleBoard has 3 columns for its operands.
   */
  col: number

  /*
   * Represents the number of rows of the operands.
   *
   * For example, exampleBoard has 2 columns for its operands.
   */
  row: number

  /*
   * Represents a list of numbers that can be used in the operands. The numbers may not be
   * consecutive.
   *
   * For example, if users want to use natural numbers less than 10 in the operands, this property
   * could be specified as follows:
   * [1, 2, 3, 4, 5, 6, 7, 8, 9]
   */
  domain: number[]

  /*
   * Represents a (incomplete) Board representing the operands, operators or results that users
   * specified for the puzzle.
   *
   * For example, if users want to include division by 8, this property could be specified as follows:
   * `    8     =
   *      /     =
   *            =
   *  =   =   =
   * `
   */
  fixedBoard?: BoardRequirement

  constructor(
    col: number,
    row: number,
    domain: number[],
    fixedBoard?: BoardRequirement,
  ) {
    this.col = col
    this.row = row
    this.domain = domain
    this.fixedBoard = fixedBoard
  }
  /*
   * Creates a Board instance for a cross math puzzle under current options (row, col, fixedBoard and
   * domain) and returns it.
   */
  createBoard(): Board {
    // TODO: Please complete this method!!
    // const operands: number[][] = new Array(this.row + 1)
    // const operators: Operator[][] = new Array(this.row * 2)
    const operators = this.fixedBoard
      ? this.fixedBoard.operators
      : new Array(this.row * 2)
    const operands = this.fixedBoard
      ? this.fixedBoard.operands
      : new Array(this.row)
    const results: Results = {
      rowResult: new Array(this.row),
      colResult: new Array(this.col),
    }

    // set operators
    for (let i = 0; i < this.row * 2 - 1; i++) {
      if (!this.fixedBoard) operators[i] = new Array(this.col)
      if (i % 2 === 0) {
        for (let j = 0; j < this.col - 1; j++) {
          if (!operators[i][j]) operators[i][j] = getRandOperator()
        }
      } else {
        for (let j = 0; j < this.col; j++) {
          if (!operators[i][j]) operators[i][j] = getRandOperator()
        }
        operators[i][this.col - 1] = Operator.Null
      }
    }

    // set operands
    for (let i = 0; i < this.row; i++) {
      if (!this.fixedBoard) operands[i] = new Array(this.col)
      for (let j = 0; j < this.col; j++) {
        if (!operands[i][j]) {
          operands[i][j] =
            this.domain[Math.floor(Math.random() * this.domain.length)]
        }
      }
    }

    // set results in row
    for (let i = 0; i < this.row; i++) {
      let res = operands[i][0]
      for (let j = 0; j < this.col - 1; j++) {
        res = computeRes(res, operands[i][j + 1], operators[2 * i][j])
      }
      results.rowResult[i] = res
    }

    // set results in column
    for (let i = 0; i < this.col; i++) {
      let res = operands[0][i]
      for (let j = 0; j < this.row - 1; j++) {
        res = computeRes(res, operands[j + 1][i], operators[2 * j + 1][i])
      }
      results.colResult[i] = res
    }
    return { operands: operands, operators: operators, results: results }
  }

  /*
   * Returns the Board instance previously created by this Puzzle. Up to five instances are stored,
   * and if users try to find a history earlier than that, it throws an error.
   */
  undo(): Board | Error {
    return exampleBoard // TODO: Please complete this method!!
  }

  /*
   * Returns the Board instance undoned by this Puzzle. Up to five instances are stored, and if users
   * try to find a history earlier than that, it throws an error.
   */
  redo(): Board | Error {
    return exampleBoard // TODO: Please complete this method!!
  }
}

export { Puzzle }
