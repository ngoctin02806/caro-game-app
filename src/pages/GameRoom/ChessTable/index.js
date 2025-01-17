import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { Redirect } from "react-router-dom";

import Cell from "./Cell";
import Player from "./Player";
import WinnerModal from "../WinnerModal";
import LoserModal from "../LoserModal";
import HistoryModal from "../HistoryModal";

import { HistoryCtx } from "../../../contexts/HistoryContext";

import ChessBoard from "../../../utils/table";

import { ChessTableWrapper, StyledStartGame } from "./styled";
import {
  computePointForUserMiddleware,
  registerLeavingRoomMiddleware,
  startGameMiddleware,
} from "../../../redux/Game/game.middlewares";
import socket from "../../../config/socket.config";
import {
  insertXO,
  resetGame,
  changePlayer,
} from "../../../redux/Game/game.actions";

class ChessTable extends Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleWin = this.handleWin.bind(this);

    this.handleOpenWinnerModal = this.handleOpenWinnerModal.bind(this);
    this.handleCloseWinnerModal = this.handleCloseWinnerModal.bind(this);

    this.handleOpenLoserModal = this.handleOpenLoserModal.bind(this);
    this.handleCloseLoserModal = this.handleCloseLoserModal.bind(this);

    this.handleRunOffTimerLoser = this.handleRunOffTimerLoser.bind(this);
    this.handleRunOffTimerWinner = this.handleRunOffTimerWinner.bind(this);

    this.redirectToHome = this.redirectToHome.bind(this);

    this.state = {
      table: [],
    };

    this.current = {};
  }

  handleOpenWinnerModal() {
    this.setState({ ...this.state, isWinner: true });
  }

  handleOpenLoserModal() {
    this.setState({ ...this.state, isLoser: true });
  }

  handleCloseWinnerModal() {
    this.setState({ ...this.state, isWinner: false });
  }

  handleCloseLoserModal() {
    this.setState({ ...this.state, isLoser: false });
  }

  redirectToHome() {
    this.setState({ ...this.state, isRedirect: true });
  }

  updateState(value) {
    this.setState(value);
  }

  handleRunOffTimerLoser() {
    this.props.computePoint(-this.props.betLevel, this.state.table);
    this.handleOpenLoserModal();

    setTimeout(() => {
      this.handleCloseLoserModal();
    }, 5000);

    return;
  }

  handleRunOffTimerWinner() {
    this.props.computePoint(this.props.betLevel, this.state.table);
    this.handleOpenWinnerModal();

    this.props.changePlayer(null);

    setTimeout(() => {
      this.handleCloseWinnerModal();
    }, 5000);
    return;
  }

  handleWin(character) {
    if (this.props.guests.find((g) => g.id === this.props.profileId)) return;

    setTimeout(() => {
      this.handleCloseLoserModal();
      this.handleCloseWinnerModal();
    }, 5000);
    this.props.resetGame();
    if (character === "X" && this.props.isXCharacter) {
      this.props.computePoint(this.props.betLevel, this.state.table);
      this.handleOpenWinnerModal();
      return;
    }

    if (character === "O" && this.props.isXCharacter) {
      this.props
        .computePoint(-this.props.betLevel, this.state.table)
        .then((res) => {
          if (res) {
            this.props.registerLeavingRoom(
              this.props.roomId,
              this.props.profileId
            );
            this.redirectToHome();
          }
        });
      this.handleOpenLoserModal();
      return;
    }

    if (character === "O" && !this.props.isXCharacter) {
      this.props.computePoint(this.props.betLevel, this.state.table);
      this.handleOpenWinnerModal();
      return;
    }

    if (character === "X" && !this.props.isXCharacter) {
      this.props
        .computePoint(-this.props.betLevel, this.state.table)
        .then((res) => {
          if (res) {
            this.props.registerLeavingRoom(
              this.props.roomId,
              this.props.profileId
            );
            this.redirectToHome();
          }
        });
      this.handleOpenLoserModal();
      return;
    }
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

    socket.on("run-off-time", ({ user_id }) => {
      this.handleRunOffTimerWinner();
    });
  }

  componentWillUnmount() {
    socket.off("step-game");
    socket.off("run-off-time");
  }

  render() {
    const {
      guests,
      players,
      profileId,
      currentPlayer,
      startGame,
      roomId,
      isXCharacter,
    } = this.props;

    if (this.state.isRedirect) {
      return <Redirect to="/trang-chu" />;
    }

    return (
      <>
        <HistoryCtx.Consumer>
          {(value) => (
            <HistoryModal
              openHistory={value.openHistory}
              setOpenHistory={value.setOpenHistory}
            />
          )}
        </HistoryCtx.Consumer>
        <WinnerModal
          isWinner={this.state.isWinner}
          closeWinnerModal={this.handleCloseWinnerModal}
        />
        <LoserModal
          isLoser={this.state.isLoser}
          closeLoserModal={this.handleCloseLoserModal}
        />
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
          {players.map((p, index) => {
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
                  handleRunOffTimerLoser={() => this.handleRunOffTimerLoser()}
                  setCurrent={(x, y) => {
                    this.current.x = x;
                    this.current.y = y;
                  }}
                  resetChessBoard={() => this.table.resetChessBoard()}
                />
              );
            }

            if (guests.find((g) => g.id === profileId)) {
              return (
                <Player
                  key={p._id}
                  player={p}
                  left={index === 0 && -100}
                  right={index === 1 && -100}
                  checkPosition={(x, y, character) => {
                    this.current.x = x;
                    this.current.y = y;
                    this.table.checkPosition(x, y, character);
                  }}
                  randomPosition={() => this.table.randomPosition()}
                  handleRunOffTimerWinner={() => this.handleRunOffTimerWinner()}
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
          {!guests.find((g) => g.id === profileId) && !currentPlayer && (
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
    players: state.game.information.room.players,
    currentPlayer: state.game.information.room.currentPlayer,
    isXCharacter: state.game.information.newGame.isXCharacter,
    betLevel: state.game.information.room.bet_level,
    guests: state.game.information.room.guests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (roomId) => dispatch(startGameMiddleware(roomId)),
    insertXO: (position, character) => dispatch(insertXO(position, character)),
    resetGame: () => dispatch(resetGame()),
    computePoint: (betLevel, chessBoard) =>
      dispatch(computePointForUserMiddleware(betLevel, chessBoard)),
    registerLeavingRoom: (roomId, userId) =>
      dispatch(registerLeavingRoomMiddleware(roomId, userId)),
    changePlayer: (userId) => dispatch(changePlayer(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessTable);
