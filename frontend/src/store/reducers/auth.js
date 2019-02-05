import { authTypes } from '../actions/actionTypes';


const initialState = {
    user: {
        _id: null,
        token: "sdsd",
        email: null,
        cellnumber: null,
    },
    loading: false,
    authRedirectPath: "/my-tabs"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case authTypes.AUTH_LOGOUT:
            return {
                ...state,
                user: {
                    _id:null,
                    token:null,
                    email:null,
                    cellnumber:null
                },
                loading: false,
            }
        case authTypes.AUTH_STARTING:
            return {
                ...state,
                user: {_id: null, token: "something", email: null, cellnumber: null},
                loading: true,
            }
        default:
            return state;
    }
}

