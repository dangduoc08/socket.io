import React, { Component } from 'react';
import './Chat.scss';
// Socket.io client
import socket from '../../utils/socket.io-client';
// Redirect
import { Redirect } from 'react-router-dom';
// URL
import URL from '../../configs/url';
// Image
import noAvatar from '../../assets/noAvatar.jpg';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: this.props.signIn,
            verifySignIn: this.props.verifySignIn,
            message: this.props.message,
        }
    }
    componentWillMount() {
        let { signIn, verifySignIn, message } = this.state;
        // Phải đăng nhập thành công mới lấy được tất cả tin nhắn
        if (signIn.length > 0 && signIn[0].success || verifySignIn.length > 0 && verifySignIn[0].success) {
            // Dispatch
            this.props.getAllMessages(localStorage.getItem('token'));
            // Client lắng nghe server trả về
            socket.on('Server-send-message', data => {
                message[0].allMessages.push(data.sendMessage)
                this.setState({
                    message
                })
            });
        }
    }

    componentDidMount() {
        let { signIn, verifySignIn } = this.state;
        if (signIn.length > 0) {
            document.title = signIn[0].signInUser.lastName
        }
        else if (verifySignIn.length > 0) document.title = verifySignIn[0].verifySignIn.lastName
    }

    // Kéo scroll bar chat xuống dưới
    componentDidUpdate () {
        if (this.refs.lastMessage) {
            this.refs.lastMessage.scrollIntoView()
        }
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        let { signIn, verifySignIn } = this.state;
        // Phải đăng nhập mới được gửi tin nhắn
        if (signIn.length > 0 || verifySignIn.length > 0) {
            this.props.sendMessage({ content: this.refs.text.value }, localStorage.getItem('token'));
        }
        // Xóa trắng
        this.refs.text.value = '';
    }

    // Đổ tất cả messenges ra
    fetchAllMessages = () => {
        let { message, signIn, verifySignIn } = this.state;
        let result = null;
        if (message.length > 0) {
            result = message[0].allMessages.map((message, index) => {
                // Nếu của người gửi thì nằm bên phải
                if (signIn.length > 0 && message.author._id === signIn[0].signInUser._id ||
                    verifySignIn.length > 0 && message.author._id === verifySignIn[0].verifySignIn._id) {
                    return (
                        <li 
                        key={index} 
                        className="chat__message--right col-12 offset-xl-1 offset-lg-1 offset-sm-1"
                        ref="lastMessage"
                        >
                            <div className="row">
                                <img 
                                src={message.author.avatar ? (URL + message.author.avatar) : noAvatar} 
                                className="chat__avatar col-1 order-3" />
                                <span className="tringle order-2"></span>
                                <div className="chat__wrapper col-xl-9 col-lg-9 col-md-9 col-sm-8 col-7 order-1">
                                    <div className="chat__text">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                }
                // Tin nhắn của người khác thì đẩy qua trái
                else {
                    return (
                        <li 
                        key={index} 
                        className="chat__message--left col-12 offset-xl-1 offset-lg-1 offset-sm-1"
                        ref="lastMessage"
                        >
                            <div className="row">
                                <img 
                                src={message.author.avatar ? (URL + message.author.avatar) : noAvatar}  
                                className="chat__avatar col-1" />
                                <span className="tringle"></span>
                                <div className="chat__wrapper col-xl-9 col-lg-9 col-md-9 col-sm-8 col-7">
                                    <div className="chat__text">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                }
            })
        }
        return result;
    }

    render() {
        let {signIn , verifySignIn} = this.props;
        // Nếu chưa đăng nhập thành công thì redirect về signin
        if (signIn.length === 0 && verifySignIn.length === 0 ) {
            return <Redirect to='/signin' />
        }
        else if (signIn.length > 0 && !signIn[0].success || verifySignIn.length > 0 && !verifySignIn[0].success) {
            return <Redirect to='/signin' />
        }
        return (
            <section className="container animated zoomIn">
                <div className="chat">
                    <header className="chat__title">
                        Message
                    </header>
                    <ul className="chat__message row">
                        {this.fetchAllMessages()}
                    </ul>
                    <form className="chat__input row form-group">
                        <input
                            className="form-control col-xl-8 col-lg-8 col-md-8 col-sm-7 col-7 offset-xl-1 offset-lg-1 offset-md-1 offset-sm-1 offset-1"
                            placeholder="Type your message here..."
                            ref="text" />
                        <button
                            onClick={this.onHandleSubmit}
                            className="btn btn-primary col-xl-2 col-lg-2 col-md-2 col-sm-2 col-3">
                            Send
                        </button>
                    </form>
                </div>
            </section>
        )
    }
}

export default Chat;