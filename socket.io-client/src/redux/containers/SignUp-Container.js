import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import SignUpAction from '../actions/signup-action';

// Components
import SignUp from '../../components/SignUp/SignUp';

class SignUpContainer extends Component {
    render() {
        return (
            <SignUp
            signUp={this.props.signUp}
            signIn={this.props.signIn}
            verifySignIn={this.props.verifySignIn}
            onSignUp={this.props.onSignUp}
            history={this.props.history}
            />
        )
    }
}

const mapStateToProps = state => ({
    signUp: state.signUp,
    signIn: state.signIn,
    verifySignIn: state.verifySignIn
})

const mapDispatchToProps = dispatch => ({
    onSignUp: (signUpData) => {
        dispatch(SignUpAction.POSTsignUp(signUpData))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);