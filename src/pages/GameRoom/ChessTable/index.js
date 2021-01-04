import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import Cell from "./Cell";
import Player from "./Player";

import ChessBoard from "../../../utils/table";

import { ChessTableWrapper, StyledStartGame } from "./styled";
import { startGameMiddleware } from "../../../redux/Game/game.middlewares";
import socket from "../../../config/socket.config";
import { insertXO, resetGame } from "../../../redux/Game/game.actions";

class ChessTable extends Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.state = {
      table: [],
    };

    this.current = {};
  }

  updateState(value) {
    this.setState(value);
  }

  handleWin(character) {
    console.log(character);
    this.props.resetGame();
  }

  handleOnClick(i, j, character) {
    return () => {
      this.current.x = i;
      this.current.y = j;
      this.table.checkPosition(i, j, character, this.handleWin);
    };
  }

  componentDidMount() {
    this.table = new ChessBoard(20, 20, this.updateState);
    socket.on("step-game", ({ step, character }) => {
      this.current = { x: step[0], y: step[1] };
      this.table.checkPosition(step[0], step[1], character, this.handleWin);
    });
  }

  componentWillUnmount() {
    socket.off("step-game");
  }

  render() {
    const {
      players,
      profileId,
      currentPlayer,
      startGame,
      roomId,
      isXCharacter,
    } = this.props;

    return (
      <ChessTableWrapper>
        {this.state.table.map((cols, i) =>
          cols.map((c, j) => (
            <Cell
              active={this.current.x === i && this.current.y === j}
              onClick={this.handleOnClick(i, j, isXCharacter ? "X" : "O")}
              c={c}
              key={`cell-${i * j + j}`}
              position={[i, j]}
            />
          ))
        )}
        {players.map((p) => {
          if (profileId === p._id) {
            return (
              <Player
                key={p._id}
                player={p}
                left={-100}
                checkPosition={(x, y, character) => {
                  this.current.x = x;
                  this.current.y = y;
                  this.table.checkPosition(x, y, character);
                }}
                randomPosition={() => this.table.randomPosition()}
                setCurrent={(x, y) => {
                  this.current.x = x;
                  this.current.y = y;
                }}
                resetChessBoard={() => this.table.resetChessBoard()}
              />
            );
          }
          return (
            <Player
              key={p._id}
              player={p}
              right={-100}
              statusTable={this.status}
              checkPosition={(x, y, character) => {
                this.current.x = x;
                this.current.y = y;
                this.table.checkPosition(x, y, character);
              }}
              randomPosition={() => this.table.randomPosition()}
              setCurrent={(x, y) => {
                this.current.x = x;
                this.current.y = y;
              }}
              resetChessBoard={() => this.table.resetChessBoard()}
            />
          );
        })}
        {!currentPlayer && (
          <StyledStartGame>
            {players.length === 2 && (
              <Button
                onClick={() => {
                  this.table.resetChessBoard();
                  startGame(roomId);
                }}
                type="primary"
              >
                Bắt đầu
              </Button>
            )}
          </StyledStartGame>
        )}
      </ChessTableWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
    players: state.game.information.room.players,
    currentPlayer: state.game.information.room.currentPlayer,
    isXCharacter: state.game.information.newGame.isXCharacter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (roomId) => dispatch(startGameMiddleware(roomId)),
    insertXO: (position, character) => dispatch(insertXO(position, character)),
    resetGame: () => dispatch(resetGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessTable);
