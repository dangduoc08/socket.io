import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'

// Components
import Nav from '../../components/Nav/Nav';
import UserInfoDropDown from '../../components/Nav/UserInfoDropDown/UserInfoDropDown';
import SignInUp from '../../components/Nav/SignInUp/SignInUp';

// Actions
import SignInAction from '../actions/signin-action';
import VerifySignInAction from '../actions/verifysignin-action';

class NavContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: [],
            verifySignIn: []
        }
    }

    // Đổ dữ liệu Link ra, phụ thuộc vào trạng thài đăng nhập
    fetchNavData () {
        let { signIn, verifySignIn} = this.state;
        let result = null;
        // Lần đầu render chưa có data trong 2 state - kiểm tra đã sign in chưa bằng token
        if (signIn.length === 0 && verifySignIn.length === 0) {
            result = (
                <SignInUp />
            )
        }
        // Click đăng nhập nhưng sai thông tin
        else if (signIn.length > 0 && !signIn[0].success) {
            result = (
                <SignInUp />
            )
        }
        // Nếu đã đăng nhập thành công thì hiện ra user info dropdown
        else if (signIn.length > 0 || verifySignIn.length > 0) {
            result = (
                <UserInfoDropDown 
                signIn={this.state.signIn}
                verifySignIn={this.state.verifySignIn}  
                onSignOut={this.onSignOut}  
                />
            )
        }
        return result
    }

    // Method đăng xuất bằng cách set state về mảng rỗng và xóa token để không giữ đăng nhập
    onSignOut = () => {
        localStorage.removeItem('token');
        this.props.onSignOut();
        this.props.onVerifySignOut();
        this.setState ({
            signIn: [],
            verifySignIn: []
        })
    }

    // Mỗi khi nhận props sẽ set lại vào state để biết là đã đăng nhập
    componentWillReceiveProps (nextProps) {
        this.setState({
            signIn: nextProps.signIn,
            verifySignIn: nextProps.verifySignIn
        })
    }

    render() {
        return (
            <Nav>
                {this.fetchNavData()}
            </Nav>
        );
    }
}

const mapStateToProps = state => ({
    signIn: state.signIn,
    verifySignIn: state.verifySignIn
})

const mapDispatchToProps = dispatch => ({
    onSignOut: () => {
        dispatch(SignInAction.signOut())
    },
    onVerifySignOut: () => {
        dispatch(VerifySignInAction.verifySignOut())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavContainer));


