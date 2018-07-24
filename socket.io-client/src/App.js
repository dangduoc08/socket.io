import React, { Component } from 'react';
import './App.scss';

// Connect
import { connect } from 'react-redux';

// Actions
import VerifySignInAction from './redux/actions/verifysignin-action';

// React Router
import { HashRouter as Router } from 'react-router-dom';

// Structures Web
import Header from './structures/Header/Header';
import Main from './structures/Main/Main';

class App extends Component {
    componentWillMount() {
        // Initial render if token exist, it's will dispatch to verify sign in
        if (localStorage.getItem('token')) {
            this.props.onVerifySignIn();
        }
    }
    
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <Main />
                </React.Fragment>
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onVerifySignIn: () => {
        dispatch(VerifySignInAction.GETverifySignIn())
    }
})

export default connect(null,mapDispatchToProps)(App);