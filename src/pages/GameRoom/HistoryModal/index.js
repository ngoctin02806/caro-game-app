import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import axios from "axios";

import Cell from "./Cell";
import Player from "./Player";

import { ChessTableWrapper } from "./styled";

const HistoryModal = (props) => {
  const { gameId, openHistory, setOpenHistory } = props;

  const [table, setTable] = useState([]);

  useEffect(() => {
    console.log(gameId);

    if (gameId) {
      axios(`/games/${gameId}`, {
        method: "GET",
      }).then((res) => {
        setTable(res.data.steps);
      });
    }
  }, [gameId]);

  return (
    <Modal
      title="Lịch sử game trước"
      visible={openHistory}
      onOk={() => setOpenHistory(false)}
      onCancel={() => setOpenHistory(false)}
      width={1000}
      footer={null}
      bodyStyle={{ display: "flex", justifyContent: "center" }}
    >
      <ChessTableWrapper>
        {table.map((cols, i) =>
          cols.map((c, j) => (
            <Cell c={c} key={`cell-${i * j + j}`} position={[i, j]} />
          ))
        )}
      </ChessTableWrapper>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    gameId: state.game.information.room.game_ids
      ? state.game.information.room.game_ids.length
        ? state.game.information.room.game_ids[0]._id
        : null
      : null,
  };
};

export default connect(mapStateToProps, null)(HistoryModal);
