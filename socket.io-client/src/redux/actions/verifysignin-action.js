import * as TYPES from '../constants/user-types';

// Utils
import apiCaller from '../../utils/apiCaller';

class VerifySignInAction {
    static GETverifySignIn = () => {
        return (dispatch) => {
            apiCaller('GET','user/verify',null,{
                token: localStorage.getItem('token')
            })
            .then (res => {
                dispatch(VerifySignInAction.verifySignIn(res.data))
            })
            .catch(err => {
                dispatch(VerifySignInAction.verifySignIn(err.response.data))
            })
        }
    }

    static verifySignIn = verifySignInData => ({
        type: TYPES.VERIFY_SIGN_IN,
        verifySignInData
    })

    static verifySignOut () {
        return ({
            type: TYPES.SIGN_OUT
        })
    }
}

export default VerifySignInAction