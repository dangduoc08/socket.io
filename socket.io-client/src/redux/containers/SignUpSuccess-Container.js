import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import SignUpSuccess from '../../components/SignUpSuccess/SignUpSuccess'

class SignUpSuccessContainer extends Component {
    render() {
        return (
            <SignUpSuccess 
            signUp={this.props.signUp}
            location={this.props.location}
            />
        )
    }
}

const mapStateToProps = state => ({
    signUp: state.signUp
})

export default connect(mapStateToProps)(SignUpSuccessContainer);