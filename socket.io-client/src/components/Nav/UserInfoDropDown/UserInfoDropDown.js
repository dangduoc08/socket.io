import React, { Component } from 'react';
import './UserInfoDropDown.scss';
import { Link } from 'react-router-dom'


class UserInfoDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn: this.props.signIn,
            verifySignIn: this.props.verifySignIn
        }
    }
    // Hiển thị last name dựa vào state
    displayLastName() {
        let result = null;
        let { signIn, verifySignIn } = this.state;
        if (signIn && signIn.length > 0) {
            result = (
                <button type="button" className="btn nav-name">
                    {signIn[0].signInUser.lastName}
                </button>
            )
        }
        else if (verifySignIn && verifySignIn.length > 0) {
            result = (
                <button type="button" className="btn nav-name">
                    {verifySignIn[0].verifySignIn.lastName}
                </button>
            )
        }
        return result
    }

    render() {
        return (
            <div className="btn-group">
                {this.displayLastName()}
                <button type="button"
                    className="btn dropdown-toggle dropdown-toggle-split nav-dropdown"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                >
                    <span className="sr-only"></span>
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to="/message">Message</Link>
                    <div className="dropdown-divider"></div>
                    <button type="button" className="btn dropdown-item" onClick={this.props.onSignOut}>
                        Sign Out
                    </button>
                </div>
            </div>
        )
    }
}

export default UserInfoDropDown;