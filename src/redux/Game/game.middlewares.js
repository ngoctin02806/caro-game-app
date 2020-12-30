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

export const registerLeavingRoom = (roomId, userId) => {
  return (dispatch) => {
    return axios(`/rooms/${roomId}/leave`, {
      method: "POST",
    })
      .then((res) => {
        dispatch(guestLeaveRoom(userId));
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
