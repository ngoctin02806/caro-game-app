class ChessBoard {
  constructor(rows, cols, setState) {
    this.rows = rows;
    this.cols = cols;
    this.setState = setState;
    this.table = Array(rows).fill(null);

    for (let i = 0; i < rows; i++) {
      this.table[i] = Array(cols).fill(null);
    }

    this.setState({ table: this.table });
  }

  randomPosition() {
    let x = -1;
    let y = -1;
    while (true) {
      x = Math.floor(Math.random() * 19 + 0);
      y = Math.floor(Math.random() * 19 + 0);

      if (!this.table[x][y])
        return {
          x,
          y,
        };
    }
  }

  cloneRow(x) {
    return this.table[x];
  }

  cloneCol(y) {
    const array = [];
    for (let i = 0; i < this.rows; i++) {
      array.push(this.table[i][y]);
    }

    return array;
  }

  cloneCrossLineLeft(x, y) {
    const array = [];

    const min = Math.min(x, y);

    let point = {
      x: x - min,
      y: y - min,
    };

    let index = 0;

    while (
      this.table[point.x + index] &&
      this.table[point.x + index][point.y + index] !== undefined
    ) {
      array.push(this.table[point.x + index][point.y + index]);
      index = index + 1;
    }

    return array;
  }

  cloneCrossLineRight(x, y) {
    const array = [];

    const min = Math.min(x, y);

    let point = {
      x: x - min,
      y: y + min,
    };

    let index = 0;

    while (
      this.table[point.x + index] &&
      this.table[point.x + index][point.y - index] !== undefined
    ) {
      array.push(this.table[point.x + index][point.y - index]);
      index = index + 1;
    }

    return array;
  }

  checkPosition(x, y, character, callback) {
    const newTable = this.table.slice();
    newTable[x][y] = character;

    this.table = newTable;
    this.setState({ table: newTable });

    const char = this.checkWinner(x, y);

    if (char) {
      callback(char);
    }
  }

  checkWinner(x, y) {
    const row = this.cloneRow(x);
    const col = this.cloneCol(y);
    const crossLeft = this.cloneCrossLineLeft(x, y);
    const crossRight = this.cloneCrossLineRight(x, y);

    let character = this.verifyWinner(row);
    if (character) return character;

    character = this.verifyWinner(col);
    if (character) return character;

    character = this.verifyWinner(crossLeft);
    if (character) return character;

    character = this.verifyWinner(crossRight);
    if (character) return character;

    return character;
  }

  verifyWinner(array) {
    let check = array[0];
    let count = 0;

    for (let i = 0; i < array.length; i++) {
      if (check && array[i] === check) {
        count = count + 1;

        console.log(count);

        if (count === 5) {
          return check;
        }
      } else {
        check = array[i];
        count = 1;
      }
    }

    return null;
  }

  resetChessBoard() {
    this.table = Array(this.rows).fill(null);
    for (let i = 0; i < this.rows; i++) {
      this.table[i] = Array(this.cols).fill(null);
    }

    this.setState({ table: this.table });
  }
}

export default ChessBoard;
