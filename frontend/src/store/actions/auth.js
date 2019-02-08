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
const authFail = (message) => {
    return {
        type: authTypes.AUTH_FAIL,
        message: message || "sorry, we could not authenticate you"
    }
}
export const executeAuth = (authData, isSignup) => dispatch => {
    dispatch(authStarting())
    let url = isSignup ? 'auth/signup' : 'auth/login';
    axios.post(`/${url}`, authData).then(res => {
        if (!res.data.token && isSignup) {
            return dispatch(authFail(res.data.message));
        }
        if (!res.data.token) {
            return dispatch(authFail());
        }
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 60000)
        let nextGreet = localStorage.getItem('nextGreeting');
        let shouldGreet = false;
        if (!nextGreet) {
            nextGreet = new Date(new Date().getTime() + 60000 * 60 * 24);
            localStorage.setItem('nextGreeting', nextGreet)
            shouldGreet = true;
        } else if (new Date(nextGreet) <= new Date()) {
            nextGreet = new Date(new Date().getTime() + 60000 * 60 * 24);
            localStorage.setItem('nextGreeting', nextGreet)
            shouldGreet = true;
        }
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('username', res.data.username);     
        res.data.greet = shouldGreet;   
        dispatch(authSuccess(res.data))
    }).catch(err => {
        console.log(err)
        dispatch(authFail())
    })
}
// LOGOUT LOGIC
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
	localStorage.removeItem('userId');
	return {
		type: authTypes.AUTH_LOGOUT
	}
}
// LOGIN THROUGH TOKEN STORED IN LOCALSTORAGE ON APP LOAD
const checkAuthTimeout = (expirationDate) => dispatch => {
	setTimeout(() => {dispatch(logout())}, (expirationDate)*1000);
}

export const checkAuth = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username')
            const authData = {userId: userId, token: token, username: username}
            dispatch(authSuccess(authData))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    }
}