import axios from '../../axios-tabless';
import { authTypes } from './actionTypes';

// LOGING IN OR SIGNING UP THREW AUTHENTICATION FORM
const authStarting = () => {
    return {
        type: authTypes.AUTH_STARTING
    }
}
const authSuccess = (authData) => {
    return {
        type: authTypes.AUTH_SUCCESS,
        authData: authData
    }
}
const authFail = () => {
    return {
        type: authTypes.AUTH_FAIL
    }
}
export const authStart = (authData, isSignup) => dispatch => {
    dispatch(authStarting())
    // let url = isSignup ? 'api/signup' : 'api/login';
    // axios.post(`/${url}`, authData).then(res => {
    //     const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
    //     localStorage.setItem('token', res.data.token)
    //     localStorage.setItem('expirationDate', expirationDate)
    //     localStorage.setItem('userId', res.data._id)        
    //     dispatch(authSuccess(res.data))
    // }).catch(err => {
    //     console.log(err)
    //     dispatch(authFail())
    // })
}
// LOGIN OUT LOGIC
export const authLogout = () => {
    localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: authTypes.AUTH_LOGOUT
	}
}
// LOGIN IN THREW TOKEN STORED IN LOCALSTORAGE ON APP LOAD
const checkAuthTimeout = (expirationDate) => dispatch => {
	setTimeout(() => {dispatch(authLogout())}, (expirationDate)*1000);
}

export const checkAuth = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(authLogout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const userId = localStorage.getItem('userId');
            const authData = {_id: userId, token: token, expirationDate: expirationDate}
            dispatch(authSuccess(authData))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date.getTime())/1000))
        }
    }
}