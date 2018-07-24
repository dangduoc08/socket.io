import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import SignInAction from '../actions/signin-action';

// Components
import SignIn from '../../components/SignIn/SignIn';

class SignInContainer extends Component {
    render() {
        return (
            <SignIn
                signIn={this.props.signIn}
                verifySignIn={this.props.verifySignIn}
                onSignIn={this.props.onSignIn}
            />
        )
    }
}

const mapStateToProps = state => ({
    signIn: state.signIn,
    verifySignIn: state.verifySignIn
})

const mapDispatchToProps = dispatch => ({
    onSignIn: (signInData) => {
        dispatch(SignInAction.POSTsignIn(signInData))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);