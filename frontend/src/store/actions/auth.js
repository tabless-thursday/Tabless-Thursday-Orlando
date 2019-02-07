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
export const executeAuth = (authData, isSignup) => dispatch => {
    dispatch(authStarting())
    setTimeout(() => {
        // dispatch(authFail()) // CAUSE ERROR
        const expirationDate = new Date(new Date().getTime() + 60000 * 120);
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
        localStorage.setItem('token', 'backendToken');
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('username', 'lambda');
        localStorage.setItem('userId', '3239834u924182u3');
        dispatch(authSuccess({token: 'backendToken', userId: '3239834u924182u3', username: 'lambda', greet: shouldGreet}))
    }, 500)
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
            const authData = {_id: userId, token: token, username: username}
            dispatch(authSuccess(authData))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    }
}