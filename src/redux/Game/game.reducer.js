import {
  ADD_MESSAGE_GAME,
  ADD_PARTICIPANT_GAME,
  CLOSE_TOPUP_MODAL,
  CREATE_ROOM_GAME,
  GET_RANKINGS,
  GUEST_JOIN_ROOM,
  GUEST_LEAVE_ROOM,
  LOADED_INFORMATION_ROOM,
  LOADED_ROOMS_GAME,
  LOADING_CREATE_ROOM_GAME,
  LOADING_RANKINGS,
  LOAD_INFORMATION_ROOM,
  LOAD_MESSAGE_GAME,
  LOAD_ROOMS_GAME,
  OPEN_CONVERSATION,
  OPEN_PASSWORD_MODAL,
  PLAYER_JOIN_ROOM,
  PLAYER_LEAVE_ROOM,
  TOPUP_LOGIN,
  USER_ONLINE,
} from "./game.types";

const INIT_STATE = {
  users: [],
  isTopUp: false,
  information: {
    isLoading: false,
    room: {
      players: [],
      guests: [],
    },
  },
  rankings: {
    isLoading: false,
    data: [],
  },
  conversation: null,
  messages: [],
  dashboard: {
    pagination: null,
    rooms: [],
    isLoading: false,
    isCreateLoading: false,
    isPrivateRoom: false,
  },
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
      };
    }
    case LOAD_MESSAGE_GAME: {
      return { ...state, messages: action.value };
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
    case LOADING_CREATE_ROOM_GAME: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          isCreateLoading: true,
        },
      };
    }
    case CREATE_ROOM_GAME: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          rooms: state.dashboard.rooms.concat(action.value),
          isCreateLoading: false,
        },
      };
    }
    case LOAD_ROOMS_GAME: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          isLoading: true,
        },
      };
    }
    case LOADED_ROOMS_GAME: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          isLoading: false,
          rooms: action.value.rooms,
          pagination: {
            ...state.dashboard.pagination,
            ...action.value.pagination,
          },
        },
      };
    }
    case LOADING_RANKINGS: {
      return {
        ...state,
        rankings: {
          ...state.rankings,
          isLoading: true,
        },
      };
    }
    case GET_RANKINGS: {
      return {
        ...state,
        rankings: {
          ...state.rankings,
          data: action.value,
          isLoading: false,
        },
      };
    }
    case TOPUP_LOGIN: {
      return {
        ...state,
        isTopUp: true,
      };
    }
    case CLOSE_TOPUP_MODAL: {
      return {
        ...state,
        isTopUp: false,
      };
    }
    case OPEN_PASSWORD_MODAL: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          isPrivateRoom: true,
        },
      };
    }
    // eslint-disable-next-line no-duplicate-case
    case CLOSE_TOPUP_MODAL: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          isPrivateRoom: false,
        },
      };
    }
    case LOAD_INFORMATION_ROOM: {
      return {
        ...state,
        information: {
          ...state.information,
          isLoading: true,
        },
      };
    }
    case LOADED_INFORMATION_ROOM: {
      return {
        ...state,
        information: {
          ...state.information,
          isLoading: false,
          room: {
            ...action.value,
            guests: state.information.room.guests,
          },
        },
      };
    }
    case GUEST_JOIN_ROOM: {
      return {
        ...state,
        information: {
          ...state.information,
          room: {
            ...state.information.room,
            guests: state.information.room.guests.concat(action.value),
          },
        },
      };
    }
    case GUEST_LEAVE_ROOM: {
      const guests = state.information.room.guests.slice();
      const newGuests = guests.filter((g) => g._id !== action.value);

      return {
        ...state,
        information: {
          ...state.information,
          room: {
            ...state.information.room,
            guests: newGuests,
          },
        },
      };
    }
    case PLAYER_JOIN_ROOM: {
      return {
        ...state,
        information: {
          ...state.information,
          room: {
            ...state.information.room,
            players: state.information.room.players.concat(action.value),
          },
        },
      };
    }
    case PLAYER_LEAVE_ROOM: {
      const players = state.information.room.players.slice();
      const newPlayers = players.filter((g) => g._id !== action.value);

      console.log(newPlayers);

      return {
        ...state,
        information: {
          ...state.information,
          room: {
            ...state.information.room,
            players: newPlayers,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default userOnlineReducer;
