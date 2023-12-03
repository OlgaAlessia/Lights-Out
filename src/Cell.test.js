import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

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

// smoke test
test("renders without crashing", function () {
  render(<table><tbody><tr><Cell flipCellsAroundMe={e => flipCellsAround('0-0')} isLit={false} /></tr></tbody></table>);
});

// snapshot test
test("matches snapshot", function () {
  const { asFragment } = render(<table><tbody><tr><Cell flipCellsAroundMe={e => flipCellsAround('0-0')} isLit={false} /></tr></tbody></table>);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the cell", function () {
  const { container } = render(
    <table><tbody><tr>
      <Cell flipCellsAroundMe={e => flipCellsAround('0-0')} isLit={false} />
      </tr></tbody></table>
  );
  const clickCell = container.querySelector(".Cell");
  fireEvent.click(clickCell);

  // expect the cell to be lit, so I won
  console.log(container)
});
