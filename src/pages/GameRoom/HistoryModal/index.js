import React, { useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import { connect } from "react-redux";
import axios from "axios";

import Cell from "./Cell";
import Player from "./Player";
import ChatBox from "./ChatBox";

import { ChessTableWrapper } from "./styled";

const HistoryModal = (props) => {
  const { gameId, gameIds, openHistory, setOpenHistory } = props;

  const [game, setGame] = useState({});

  const getGameByPage = (page) => {
    const { _id } = gameIds[page - 1];

    axios(`/games/${_id}`, {
      method: "GET",
    }).then((res) => {
      setGame(res.data);
    });
  };

  useEffect(() => {
    if (gameId) {
      axios(`/games/${gameId}`, {
        method: "GET",
      }).then((res) => {
        setGame(res.data);
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
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <ChessTableWrapper>
        {game.steps &&
          game.steps.map((cols, i) =>
            cols.map((c, j) => (
              <Cell c={c} key={`cell-${i * j + j}`} position={[i, j]} />
            ))
          )}
        {game.players &&
          game.players.map((p, index) => {
            if (index) {
              return (
                <Player
                  isWinner={game.winner_id === p._id}
                  left={-100}
                  player={p}
                />
              );
            }

            return (
              <Player
                isWinner={game.winner_id === p._id}
                right={-100}
                player={p}
              />
            );
          })}
      </ChessTableWrapper>
      <Pagination
        style={{ marginTop: "10px" }}
        defaultCurrent={1}
        total={gameIds.length}
        pageSize={1}
        onChange={getGameByPage}
      />
      <ChatBox gameId={game._id} />
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
    gameIds: state.game.information.room.game_ids || [],
  };
};

export default connect(mapStateToProps, null)(HistoryModal);
