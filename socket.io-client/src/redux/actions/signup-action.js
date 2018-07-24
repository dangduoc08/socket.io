import * as TYPES from '../constants/user-types';

// Utils
import apiCaller from '../../utils/apiCaller';

class SignUpAction {
    static POSTsignUp = (signUpData) => {
        return (dispatch) => {
            apiCaller ('POST','user/signup',signUpData)
            .then (res => {
                dispatch (SignUpAction.signUp(res.data))
            })
            .catch (err => {
                dispatch (SignUpAction.signUp(err.response.data))
            })
        }
    }
    static signUp = (signUpData) => {
        return {
            type: TYPES.SIGN_UP,
            signUpData
        }
    }
}

export default SignUpAction;