import axios from "axios";
import shortid from "shortid";

import socket from "../../config/socket.config";

import {
  ADD_CONVERSATION,
  REMOVE_CONVERSATION,
  ADD_MESSAGE,
  LOAD_CONVERSATION,
} from "./conversation.types";

export const addConversation = ({ conversation, identify }) => {
  return {
    type: ADD_CONVERSATION,
    value: { conversation, identify },
  };
};

export const removeConversation = (conversationId) => {
  return {
    type: REMOVE_CONVERSATION,
    value: conversationId,
  };
};

export const addMessageToConver = ({ message, conversationId }) => {
  return {
    type: ADD_MESSAGE,
    value: { message: message, conversationId },
  };
};

export const loadConversation = ({ identify }) => {
  return {
    type: LOAD_CONVERSATION,
    value: identify,
  };
};

export const addConversationMiddleware = ({
  userId,
  partnerId,
  avatarPartner,
  userNamePartner,
}) => {
  return (dispatch) => {
    const identify = shortid.generate();

    dispatch(loadConversation({ identify }));

    axios("/conversations", {
      method: "POST",
      data: {
        participants: [userId, partnerId],
        type: "CONVERSATION_SINGLE",
      },
    })
      .then((res) => {
        const conversation = res.data.data || res.data;

        return axios(`/conversations/${conversation._id}/messages`, {
          method: "GET",
        });
      })
      .then((res) => {
        const preparedConversation = {
          conversationId: res.config.url.split("/")[2],
          participants: [
            userId,
            {
              user_id: partnerId,
              avatar: avatarPartner,
              username: userNamePartner,
            },
          ],
          messages: res.data.messages,
        };

        dispatch(
          addConversation({
            conversation: preparedConversation,
            identify: identify,
          })
        );
      });

    socket.emit("emit-conversation-single", {
      room_id: "Q6VB8LYM-pI33R6vV1j9wThUdJ2YP9qFpaXE6qeR",
      partner_id: "RBWHl-P7J5tXm9nCPUQrkU-EmwG78pXovt3ue0Nx",
    });
  };
};

export const addMessageToConverMiddleware = ({ message, conversationId }) => {
  return (dispatch) => {
    socket.emit("emit-conversation-message", {
      room_id: "Q6VB8LYM-pI33R6vV1j9wThUdJ2YP9qFpaXE6qeR",
      message: {
        sender_id: "ymJvdO9qDYzOv-hcB8TTky9w-vNKHYvcmzYlV9Jf",
        content: message.content,
        type: "CONVERSATION_SINGLE",
      },
    });

    dispatch(addMessageToConver({ message, conversationId }));
  };
};
