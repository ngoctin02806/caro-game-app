import React from "react";

import Cell from "./Cell";

import { ChessTableWrapper } from "./styled";

const ChessTable = () => {
  const tables = new Array(400).fill(0);

  console.log(tables);

  return (
    <ChessTableWrapper>
      {tables.map((c, i) => (
        <Cell key={i} />
      ))}
    </ChessTableWrapper>
  );
};

export default ChessTable;
