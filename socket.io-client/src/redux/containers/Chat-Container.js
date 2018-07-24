import React, { Component } from 'react';

import { connect } from 'react-redux';

// Actions
import MessageAction from '../actions/message-action';

// Components
import Chat from '../../components/Chat/Chat';

class ChatContainer extends Component { 
    render() {
        return (
            <Chat 
                signIn={this.props.signIn}
                verifySignIn={this.props.verifySignIn}
                message={this.props.message}
                getAllMessages={this.props.onGetAllMessages}
                sendMessage={this.props.onSendMessage}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.message,
        signIn: state.signIn,
        verifySignIn: state.verifySignIn
    }
}

const mapDispatchToProps = dispatch => ({
    onGetAllMessages: token => {
        dispatch(MessageAction.GETallMessages(token))
    },
    onSendMessage: (content,token) => {
        dispatch(MessageAction.POSTsendMessage(content,token))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatContainer);