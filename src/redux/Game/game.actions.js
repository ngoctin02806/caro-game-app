import {
  ADD_MESSAGE_GAME,
  ADD_PARTICIPANT_GAME,
  CREATE_ROOM_GAME,
  LOADED_ROOMS_GAME,
  LOADING_CREATE_ROOM_GAME,
  LOAD_MESSAGE_GAME,
  LOAD_ROOMS_GAME,
  OPEN_CONVERSATION,
  SAVE_PARTICIPANTS_ROOM_GAME,
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

export const saveParticipants = (participants) => {
  return {
    type: SAVE_PARTICIPANTS_ROOM_GAME,
    value: participants,
  };
};
