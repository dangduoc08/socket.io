import React from 'react';

// Components
import Home from '../components/Home/Home';

// Containers
import SignUpContainer from '../redux/containers/SignUp-Container';
import SignInContainer from '../redux/containers/SignIn-Container';
import SignUpSuccessContainer from '../redux/containers/SignUpSuccess-Container';
import ChatContainer from '../redux/containers/Chat-Container';

export const routes = [
    {
        path: "/",
        main: () => <Home />,
        exact: true
    },
    {
        path: "/signin",
        main: () => <SignInContainer />,
    },
    {
        path: "/signup",
        main: ({ history }) => <SignUpContainer history={history} />,
        exact: true
    },
    {
        path: "/signup/success",
        main: ({ location }) => <SignUpSuccessContainer location={location} />,
    },
    {
        path: "/message",
        main: () => <ChatContainer />
    }
]