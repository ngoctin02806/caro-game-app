import axios from "axios";
import shortid from "shortid";

import socket from "../../config/socket.config";

import {
  ADD_CONVERSATION,
  REMOVE_CONVERSATION,
  ADD_MESSAGE,
  LOAD_CONVERSATION,
  CLOSE_CONVERSATION,
  RECEIVED_MESSAGE,
} from "./conversation.types";

export const nothing = () => {
  return {
    type: "NOTHING",
  };
};

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

export const closeConversation = (conversationId) => {
  return {
    type: CLOSE_CONVERSATION,
    value: conversationId,
  };
};

export const updateHasReceivedMessageState = ({ identify, conversationId }) => {
  return {
    type: RECEIVED_MESSAGE,
    value: { identify, conversationId },
  };
};

export const addConversationMiddleware = ({
  userId,
  partnerId,
  avatarPartner,
  userNamePartner,
}) => {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const state = getState();

      const conversations = state.chat.conversations;

      console.log(`user-id: ${userId}`, `partner_id: ${partnerId}`);

      const check = conversations.findIndex((con) => {
        if (
          con.type === "CONVERSATION_SINGLE" &&
          con.participants[0] === userId &&
          con.participants[1].user_id === partnerId
        ) {
          return true;
        }

        return false;
      });

      if (check === -1) {
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

            // Save all conversations when opens
            const conversations = JSON.parse(
              localStorage.getItem("conversations")
            );
            const isExistConversation = conversations.findIndex(
              (con) => con === conversation._id
            );

            if (isExistConversation === -1) {
              localStorage.setItem(
                "conversations",
                JSON.stringify(conversations.concat(conversation._id))
              );
            }

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
              type: "CONVERSATION_SINGLE",
              messages: res.data.messages.sort((mess1, mess2) => {
                return mess1.created_at - mess2.created_at;
              }),
            };

            socket.emit("emit-conversation-single", {
              room_id: res.config.url.split("/")[2],
              partner_id: partnerId,
            });

            dispatch(
              addConversation({
                conversation: preparedConversation,
                identify: identify,
              })
            );

            resolve({ conversationId: res.config.url.split("/")[2] });
          });
      } else {
        console.log("nothing");
        dispatch(nothing());
        resolve({ conversationId: conversations[check].conversationId });
      }
    });
};

export const addMessageToConverMiddleware = ({
  message,
  conversationId,
  senderId,
}) => {
  return (dispatch) => {
    const id = shortid.generate();

    socket.emit(
      "emit-conversation-message",
      {
        room_id: conversationId,
        message: {
          identify: id,
          sender_id: senderId,
          content: message.content,
          type: "CONVERSATION_SINGLE",
        },
      },
      "1",
      (response) => {
        const { identify, conversation_id: conversationId } = response.status;
        dispatch(updateHasReceivedMessageState({ identify, conversationId }));
      }
    );

    dispatch(
      addMessageToConver({
        message: {
          ...message,
          created_by: senderId,
          hasReceived: false,
          identify: id,
        },
        conversationId,
      })
    );
  };
};

export const addMessageFromSocketMiddleware = ({
  message,
  conversationId,
  senderId,
}) => {
  return (dispatch) => {
    dispatch(
      addMessageToConver({
        message: {
          ...message,
          created_by: senderId,
          hasReceived: false,
        },
        conversationId,
      })
    );
  };
};
