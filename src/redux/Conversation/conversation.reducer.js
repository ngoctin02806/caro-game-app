import {
  ADD_CONVERSATION,
  ADD_MESSAGE,
  LOAD_CONVERSATION,
} from "./conversation.types";

const INIT_STATE = {
  conversations: [],
  loading: false,
};

const conversationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_CONVERSATION: {
      return {
        ...state,
        loading: true,
        conversations: state.conversations.concat({
          conversationId: action.value,
          participants: [],
          messages: [],
        }),
      };
    }
    case ADD_CONVERSATION:
      const index = state.conversations.findIndex(
        (con) => con.conversationId === action.value.identify
      );

      console.log(index);

      const newConversations = Array.from(state.conversations);
      newConversations[index] = action.value.conversation;

      console.log(newConversations);

      return {
        ...state,
        conversations: newConversations,
        loading: false,
      };

    case ADD_MESSAGE: {
      const conversationIndex = state.conversations.findIndex(
        (con) => con.conversationId === action.value.conversationId
      );

      const conversation = Object.assign(
        {},
        state.conversations[conversationIndex]
      );

      conversation.messages = conversation.messages.concat(
        action.value.message
      );

      console.log(conversation);

      const newConversations = Array.from(state.conversations);
      newConversations.splice(conversationIndex, 1, conversation);

      console.log(newConversations);

      return {
        ...state,
        conversations: newConversations,
      };
    }

    default:
      return state;
  }
};

export default conversationReducer;
