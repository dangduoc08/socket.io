import * as TYPES from '../constants/user-types';

const verifySignIn = (state=[], action) => {
    if (action.type === TYPES.VERIFY_SIGN_IN) {
        state.splice(0,1,action.verifySignInData);
        return [...state];
    }
    else if (action.type === TYPES.SIGN_OUT) {
        state = [];
        return [...state]
    }
    return state;
}

export default verifySignIn;