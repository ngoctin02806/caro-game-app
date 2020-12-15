import {
  ADD_MESSAGE_GAME,
  ADD_PARTICIPANT_GAME,
  LOAD_MESSAGE_GAME,
  OPEN_CONVERSATION,
  USER_ONLINE,
} from "./game.types";

const INIT_STATE = {
  users: [],
  information: null,
  conversation: null,
  messages: [],
};

const userOnlineReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_ONLINE:
      return {
        ...state,
        users: action.value.users,
      };
    case OPEN_CONVERSATION: {
      return {
        ...state,
        conversation: action.value.conversation,
        information: "Testing",
      };
    }
    case LOAD_MESSAGE_GAME: {
      return { ...state, messages: state.messages.concat(action.value) };
    }
    case ADD_MESSAGE_GAME: {
      return {
        ...state,
        messages: state.messages.concat(action.value),
      };
    }
    case ADD_PARTICIPANT_GAME: {
      return {
        ...state,
        conversation: {
          ...state.conversation,
          participants: state.conversation.participants.concat(action.value),
        },
      };
    }
    default:
      return state;
  }
};

export default userOnlineReducer;
