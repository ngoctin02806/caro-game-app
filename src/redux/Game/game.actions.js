import {
  ADD_MESSAGE_GAME,
  ADD_PARTICIPANT_GAME,
  CREATE_ROOM_GAME,
  LOADING_CREATE_ROOM_GAME,
  LOAD_MESSAGE_GAME,
  OPEN_CONVERSATION,
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
