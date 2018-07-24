import * as TYPES from '../constants/user-types';

// Utils
import apiCaller from '../../utils/apiCaller';

class SignInAction {
    static POSTsignIn = (signInData) => {
        return (dispatch) => {
            apiCaller('POST', 'user/signin', signInData)
            .then(res => {
                dispatch(SignInAction.signIn(res.data))
            })
            .catch(err => {
                dispatch(SignInAction.signIn(err.response.data))
            })
        }
    }
    static signIn(signInData) {
        return {
            type: TYPES.SIGN_IN,
            signInData
        }
    }
    static signOut() {
        return {
            type: TYPES.SIGN_OUT
        }
    }
}

export default SignInAction;