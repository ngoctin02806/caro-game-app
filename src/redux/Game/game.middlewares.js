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

export const createRoomGameMiddleware = () => {
  return (dispatch) => {
    dispatch(loadingCreateRoomGame());
    return axios("/room/create", {
      method: "POST",
    })
      .then((res) => {
        dispatch(createRoomGame(res.data));
        return res.data;
      })
      .catch((e) => {});
  };
};