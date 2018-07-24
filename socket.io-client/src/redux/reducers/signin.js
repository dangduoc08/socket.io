import * as TYPES from '../constants/user-types';

const initialState = [];

const signIn = (state=initialState, action) => {
    if (action.type === TYPES.SIGN_IN) {
        state.splice(0,1,action.signInData)
        return [...state]
    }
    else if (action.type === TYPES.SIGN_OUT) {
        state = [];
        return [...state]
    }
    return state;
}

export default signIn;