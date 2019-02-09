import { combineReducers } from 'redux';
import authReducer from './auth';
import tabsReducer from './tabs';


export default combineReducers({
    auth: authReducer,
    tabs: tabsReducer
})