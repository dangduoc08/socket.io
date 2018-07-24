import { combineReducers } from 'redux';

// Reducers
import signUp from './signup';
import signIn from './signin';
import verifySignIn from './verifysignin';
import message from './message';

const myReducer = combineReducers ({
    signUp,
    signIn,
    verifySignIn,
    message
})

export default myReducer;