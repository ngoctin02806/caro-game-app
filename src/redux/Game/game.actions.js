import {
  ADD_MESSAGE_GAME,
  ADD_PARTICIPANT_GAME,
  CHANGE_PLAYER_IN_GAME,
  CLOSE_TOPUP_MODAL,
  CREATE_ROOM_GAME,
  GET_RANKINGS,
  GUEST_JOIN_ROOM,
  GUEST_LEAVE_ROOM,
  INSERT_X_O,
  LOADED_INFORMATION_ROOM,
  LOADED_ROOMS_GAME,
  LOADING_CREATE_ROOM_GAME,
  LOADING_RANKINGS,
  LOAD_INFORMATION_ROOM,
  LOAD_MESSAGE_GAME,
  LOAD_ROOMS_GAME,
  OPEN_CONVERSATION,
  PLAYER_JOIN_ROOM,
  PLAYER_LEAVE_ROOM,
  RESET_CURRENT_PLAYER,
  RESET_NEXT_PLAYER,
  START_GAME,
  TOPUP_LOGIN,
  USER_ONLINE,
} from "./game.types";

export const nothing = () => {
  return {
    type: "NOTHING",
  };
};

export const getUserOnline = (payload) => {
  return {
    type: USER_ONLINE,
    value: payload,
  };
};

export const openConversation = (payload) => {
  return {
    type: OPEN_CONVERSATION,
    value: payload,
  };
};

export const loadMessage = (messages) => {
  return {
    type: LOAD_MESSAGE_GAME,
    value: messages,
  };
};

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE_GAME,
    value: message,
  };
};

export const addParticipant = (participant) => {
  return {
    type: ADD_PARTICIPANT_GAME,
    value: participant,
  };
};

export const loadingCreateRoomGame = (room) => {
  return {
    type: LOADING_CREATE_ROOM_GAME,
    value: room,
  };
};

export const createRoomGame = (room) => {
  return {
    type: CREATE_ROOM_GAME,
    value: room,
  };
};

export const loadingRoomsGame = () => {
  return {
    type: LOAD_ROOMS_GAME,
  };
};

export const loadedRoomsGame = (rooms) => {
  return {
    type: LOADED_ROOMS_GAME,
    value: rooms,
  };
};

export const getRankings = (rankings) => {
  return {
    type: GET_RANKINGS,
    value: rankings,
  };
};

export const loadingRankings = () => {
  return {
    type: LOADING_RANKINGS,
  };
};

export const topUpLogin = () => {
  return {
    type: TOPUP_LOGIN,
  };
};

export const closeTopUpModal = () => {
  return {
    type: CLOSE_TOPUP_MODAL,
  };
};

export const loadInfoRoom = () => {
  return {
    type: LOAD_INFORMATION_ROOM,
  };
};

export const loadedInfoRoom = (room) => {
  return {
    type: LOADED_INFORMATION_ROOM,
    value: room,
  };
};

export const guestJoinRoom = (user) => {
  return {
    type: GUEST_JOIN_ROOM,
    value: user,
  };
};

export const guestLeaveRoom = (userId) => {
  return {
    type: GUEST_LEAVE_ROOM,
    value: userId,
  };
};

export const playerJoinRoom = (user) => {
  return {
    type: PLAYER_JOIN_ROOM,
    value: user,
  };
};

export const playerLeaveRoom = (userId) => {
  return {
    type: PLAYER_LEAVE_ROOM,
    value: userId,
  };
};

export const createGame = (game) => {
  return {
    type: START_GAME,
    value: game,
  };
};

export const changePlayer = (userId) => {
  return {
    type: CHANGE_PLAYER_IN_GAME,
    value: userId,
  };
};

export const resetCurrentPlayer = () => {
  return {
    type: RESET_CURRENT_PLAYER,
  };
};

export const resetNextPlayer = () => {
  return {
    type: RESET_NEXT_PLAYER,
  };
};

export const insertXO = (position, character) => {
  return {
    type: INSERT_X_O,
    value: {
      position,
      character,
    },
  };
};
