import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 1, ncols = 1, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    return Array.from({ length: nrows },
                      row => Array.from({ length: ncols },
                        cell => Math.random() < chanceLightStartsOn)
    );
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let r = 0; r < nrows; r++) {
      for (let c = 0; c < ncols; c++) {
        if (board[r][c] === false) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyBoard = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y - 1, x, copyBoard);
      flipCell(y, x - 1, copyBoard);
      flipCell(y, x, copyBoard);
      flipCell(y, x + 1, copyBoard);
      flipCell(y + 1, x, copyBoard);

      // TODO: return the copy
      return copyBoard;
    });
  }

  // TODO: if the game is won, just show a winning msg & render nothing else
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  //TODO: make table board
  let tbody = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell key={coord}
          flipCellsAroundMe={e => flipCellsAround(coord)}
          isLit={board[y][x]}
        />
      );
    }
    tbody.push(<tr key={y}>{row}</tr>);
  }


  return (
    <table className="Board">
      <tbody>{tbody}</tbody>
    </table>
  );

}

export default Board;
