import { combineReducers } from 'redux';
import authReducer from './auth';

const initialState = {

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default combineReducers({
    reducer,
    auth: authReducer
})