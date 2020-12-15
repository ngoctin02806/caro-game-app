import {
  ADD_CONVERSATION,
  ADD_MESSAGE,
  CLOSE_CONVERSATION,
  LOAD_CONVERSATION,
  RECEIVED_MESSAGE,
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

    case CLOSE_CONVERSATION: {
      const newArray = state.conversations.slice();
      const index = newArray.findIndex(
        (con) => con.conversationId === action.value
      );

      newArray.splice(index, 1);

      return {
        ...state,
        conversations: newArray,
      };
    }

    case ADD_CONVERSATION: {
      const index = state.conversations.findIndex(
        (con) => con.conversationId === action.value.identify
      );

      const newConversations = Array.from(state.conversations);
      if (index !== -1) {
        newConversations[index] = action.value.conversation;
      }

      return {
        ...state,
        conversations: newConversations,
        loading: false,
      };
    }

    case ADD_MESSAGE: {
      console.log(state.conversations);

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

      const newConversations = Array.from(state.conversations);
      newConversations.splice(conversationIndex, 1, conversation);

      return {
        ...state,
        conversations: newConversations,
      };
    }

    case RECEIVED_MESSAGE: {
      const conversations = state.conversations.slice();
      const index = conversations.findIndex(
        (con) => con.conversationId === action.value.conversationId
      );

      const messages = conversations[index].messages.slice();

      const indexMessage = messages.findIndex(
        (mes) => mes.identify === action.value.identify
      );

      messages[indexMessage].hasReceived = true;

      conversations[index].messages = messages;

      return {
        ...state,
        conversations: conversations,
      };
    }

    default:
      return state;
  }
};

export default conversationReducer;
