import React from "react";

import "./style.css";

import Square from "./Square";

const Board = (props) => {
  const renderSquare = (i, isHighlighted) => {
    return <Square key={i} />;
  };

  const renderBoard = (size) => {
    let board = [];

    for (let i = 0; i < size; i++) {
      let boardRow = [];
      for (let j = 0; j < size; j++) {
        const iCell = i * size + j;
        boardRow.push(renderSquare(iCell, false));
      }
      board.push(
        <div key={i} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  return <div>{renderBoard(15)}</div>;
};

export default Board;
