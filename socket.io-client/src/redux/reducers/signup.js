import * as TYPES from '../constants/user-types';

const initialState = [];

const signUp = (state=initialState, action) => {
    if (action.type === TYPES.SIGN_UP) {
        state.splice(0,1,action.signUpData);
        return [...state];
    }
    return state;
}

export default signUp;