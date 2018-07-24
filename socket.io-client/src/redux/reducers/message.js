import * as TYPES from '../constants/message-types';

// Socket
import socket from '../../utils/socket.io-client';

const initialState = [];

const message = (state=initialState, action) => {
    switch (action.type) {
        case TYPES.GET_ALL_MESSAGES:
            state.splice(0,1,action.allMessagesData);
            return [...state];
        case TYPES.SEND_MESSAGE:
            return [...state];
        default: 
            return state;
    }
}

export default message;