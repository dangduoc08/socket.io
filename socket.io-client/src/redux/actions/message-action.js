import * as TYPES from '../constants/message-types';

// Utils
import apiCaller from '../../utils/apiCaller';

// Socket
import socket from '../../utils/socket.io-client';

class MessageAction {
    // Lấy tất cả tin nhắn
    static GETallMessages (token) {
        return dispatch => {
            apiCaller('GET','message/all',null,{
                token
            })
            .then (res => {
                dispatch(MessageAction.getMessages(res.data))
            })
            .catch (error => {
                dispatch(MessageAction.getMessages(error.response.data))
            })
        }
    }
    static getMessages (allMessagesData) {
        return {
            type: TYPES.GET_ALL_MESSAGES,
            allMessagesData
        }
    }
    // Gửi tin nhắn
    static POSTsendMessage (content,token) {
        return dispatch => {
            apiCaller('POST','message/send',content,{
                token
            })
            .then(res => {
                // Client gửi lên server
                socket.emit('Client-send-message', res.data);
                dispatch(MessageAction.sendMessage());
            })
            .catch(error => {
                dispatch(MessageAction.sendMessage(error.response.data))
            })
        }
    }
    static sendMessage () {
        return ({
            type: TYPES.SEND_MESSAGE,
        })
    }
}

export default MessageAction;
