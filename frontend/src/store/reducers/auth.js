import { authTypes } from '../actions/actionTypes';


const initialState = {
    user: {
        _id: null,
        token: null,
        username: null,
    },
    loading: false,
    error: null,
    authRedirectPath: "/my-tabs",
    greet: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case authTypes.AUTH_LOGOUT:
            return {
                ...state,
                user: { _id:null, token:null, username: null },
                loading: false,
                error: null,
                greet: false
            }
        case authTypes.AUTH_STARTING:
            return {
                ...state,
                user: {_id: null, token: null, username: null},
                loading: true,
                error: null
            }
        case authTypes.AUTH_SUCCESS:
            return {
                ...state,
                user: {_id: action.authData.userId, token: action.authData.token, username: action.authData.username},
                loading: false,
                error: null,
                greet: action.authData.greet || false
            }
        case authTypes.AUTH_FAIL:
            return {
                ...state,
                user: {_id: null, token: null, username: null},
                loading: false,
                error: "sorry, we could not authenticate you"
            }
        default:
            return state;
    }
}

