import axios from "axios";

import socket from "../../config/socket.config";

import {
  getUserOnline,
  openConversation,
  loadMessage,
  addMessage,
  addParticipant,
  nothing,
  createRoomGame,
  loadingCreateRoomGame,
  loadingRoomsGame,
  loadedRoomsGame,
  getRankings,
  loadingRankings,
  loadInfoRoom,
  loadedInfoRoom,
  guestJoinRoom,
  guestLeaveRoom,
  playerJoinRoom,
  createGame,
  resetCurrentPlayer,
  resetNextPlayer,
  endGame,
} from "./game.actions";

import { GET_ERRORS } from "../Error/error.types";

export const getUserOnlineMiddleware = () => {
  return (dispatch) => {
    return axios("/me/user-online", {
      method: "GET",
    })
      .then((res) => {
        dispatch(getUserOnline({ users: [...res.data.data.users] }));
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const openConversationMiddleware = (roomId) => {
  return (dispatch) => {
    return axios(`/games/${roomId}/conversation`, {
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        dispatch(openConversation({ conversation: res.data.data }));

        return res.data.data._id;
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const loadMessageMiddleware = (conversationId) => {
  return (dispatch) => {
    return axios(`/conversations/${conversationId}/messages`, {
      method: "GET",
    })
      .then((res) => {
        dispatch(
          loadMessage(
            res.data.messages.sort(
              (mess1, mess2) => mess1.created_at - mess2.created_at
            )
          )
        );
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const addMessageMiddleware = ({ message, senderId, conversationId }) => {
  return (dispatch) => {
    console.log(conversationId);
    socket.emit("emit-conversation-game-message", {
      room_id: conversationId,
      message: {
        sender_id: senderId,
        content: message.content,
        type: "CONVERSATION_GAME",
        avatar: message.avatar,
      },
    });

    dispatch(addMessage({ content: message.content, created_by: senderId }));
  };
};

export const addParticipantMiddleware = (participant) => {
  return (dispatch, getState) => {
    const state = getState();

    if (
      state.game.conversation.participants.find(
        (p) => p.user_id === participant.user_id
      )
    ) {
      dispatch(nothing());
    } else {
      dispatch(addParticipant(participant));
    }
  };
};

export const listenMessageMiddleware = ({ message, senderId }) => {
  return (dispatch) => {
    dispatch(addMessage({ content: message.content, created_by: senderId }));
  };
};

export const createRoomGameMiddleware = ({ type, roomSecret, betLevel }) => {
  return (dispatch) => {
    dispatch(loadingCreateRoomGame());
    return axios("/rooms", {
      method: "POST",
      data: {
        type,
        room_secret: roomSecret,
        bet_level: betLevel,
      },
    })
      .then((res) => {
        dispatch(createRoomGame(res.data));
        return res.data;
      })
      .catch((e) => {});
  };
};

export const loadRoomsGameMiddleware = ({ offset = 1, limit = 20 }) => {
  return (dispatch) => {
    dispatch(loadingRoomsGame());
    return axios(`/rooms?offset=${offset}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => {
        dispatch(
          loadedRoomsGame({
            rooms: res.data.rooms,
            pagination: {
              total: res.data.total,
              offset: res.data.offset,
              limit: res.data.limit,
            },
          })
        );
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const getRankingsMiddleware = () => {
  return (dispatch) => {
    dispatch(loadingRankings());
    return axios("/statistic/rankings", {
      method: "GET",
    })
      .then((res) => {
        dispatch(getRankings(res.data.top_rankings));
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const topUpLoginMiddleware = () => {
  return (dispatch) => {
    return axios("/users/coins/giveaway", {
      method: "POST",
    }).catch((e) => {
      return "has_top_up";
    });
  };
};

export const enterPasswordToJoinRoom = (roomId, roomSecret = "", user) => {
  return (dispatch) => {
    return axios(`/rooms/${roomId}/join`, {
      method: "POST",
      data: {
        room_secret: roomSecret,
      },
    })
      .then((res) => {
        if (res.data.message === "FULL_SLOT") {
          dispatch(guestJoinRoom(user));
          socket.emit("emit-join-room-game", {
            room_id: roomId,
            user_id: user.id,
            type: "GUEST",
          });
        } else {
          socket.emit("emit-join-room-game", {
            room_id: roomId,
            user_id: user.id,
          });
          dispatch(playerJoinRoom(user));
        }

        return res.data.message;
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const getInformationRoomMiddleware = (roomId) => {
  return (dispatch) => {
    dispatch(loadInfoRoom());
    return axios(`/rooms/${roomId}`, {
      method: "GET",
    })
      .then((res) => {
        dispatch(loadedInfoRoom(res.data));
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const registerLeavingRoomMiddleware = (roomId, userId) => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.game.information.room.guests.find((g) => g.id === userId)) {
      socket.emit("emit-leave-room-game", {
        room_id: roomId,
        user_id: userId,
        type: "GUEST",
      });

      dispatch(guestLeaveRoom(userId));

      return Promise.resolve();
    }

    return axios(`/rooms/${roomId}/leave`, {
      method: "POST",
    })
      .then((res) => {
        socket.emit("emit-leave-room-game", {
          room_id: roomId,
          user_id: userId,
        });

        dispatch(resetCurrentPlayer());

        return res.data;
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const startGameMiddleware = (roomId) => {
  return (dispatch, getState) => {
    const state = getState();

    const profileId = state.auth.profileId;
    const players = state.game.information.room.players;

    return axios(`/rooms/${roomId}/games`, {
      method: "POST",
      data: {
        players: players.map((p) => p._id),
      },
    })
      .then((res) => {
        res.data.isXCharacter = true;

        dispatch(createGame(res.data));

        res.data.isXCharacter = false;
        socket.emit("emit-start-game", {
          room_id: roomId,
          user_id: profileId,
          game: res.data,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const nextPlayerMiddleware = (roomId, userId, step, character) => {
  return (dispatch, getState) => {
    const state = getState();
    const nextPlayer = state.game.information.room.players.find(
      (p) => p._id !== userId
    );

    dispatch(resetNextPlayer());

    socket.emit("emit-step-game", {
      room_id: roomId,
      user_id: userId,
      next_user_id: nextPlayer._id,
      character,
      step,
    });
  };
};

export const insertXOMiddleware = (roomId, userId, step, character) => {
  return (dispatch, getState) => {
    const state = getState();
    const nextPlayer = state.game.information.room.players.find(
      (p) => p._id !== userId
    );

    const currentPlayer = state.game.information.room.currentPlayer;

    if (currentPlayer) {
      dispatch(resetNextPlayer());

      socket.emit("emit-step-game", {
        room_id: roomId,
        user_id: userId,
        next_user_id: nextPlayer._id,
        character,
        step,
      });
    } else {
      socket.emit("emit-step-game", {
        room_id: roomId,
        user_id: userId,
        next_user_id: null,
        character,
        step,
      });
    }
  };
};

export const computePointForUserMiddleware = (betLevel, chessBoard) => {
  return (dispatch, getState) => {
    const state = getState();

    const profileId = state.auth.profileId;
    const roomId = state.game.information.room._id;
    const gameId = state.game.information.newGame._id;

    const players = state.game.information.room.players;

    const newPlayers = players.slice();
    const index = newPlayers.findIndex((p) => p._id === profileId);
    const index2 = newPlayers.findIndex((p) => p._id !== profileId);
    newPlayers[index].point = newPlayers[index].point + betLevel;
    newPlayers[index2].point = newPlayers[index2].point - betLevel;

    return axios(`/rooms/${roomId}/games/${gameId}/coins/charge`, {
      method: "POST",
      data: {
        point: betLevel,
        chess_board: chessBoard,
      },
    })
      .then((res) => {
        dispatch(endGame({ players: newPlayers, point: betLevel }));
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};
