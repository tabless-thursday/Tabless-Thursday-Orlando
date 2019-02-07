import axios from '../../axios-tabless';
import { tabsTypes } from './actionTypes';

// ADDING A NEW TAB
const addingTab = () => {
    return {
        type: tabsTypes.ADDING_TAB
    }
}
const addSucceeded = (newTabs) => {
    return {
        type: tabsTypes.ADD_SUCCEEDED,
        newTabs: newTabs
    }
}
const addFailed = () => {
    return {
        type: tabsTypes.ADD_FAILED
    }
}
export const addTab = (tabData, userId) => dispatch => {
    dispatch(addingTab());
    console.log('tabData:',tabData, 'userId:', userId )
    // axios.post(`tabs/${userId}`).then(res => {
    //     dispatch(addSucceeded(res.data))
    // }).catch(err => {
    //     dispatch(addFailed())
    //     console.error(err)
    // })
}
// FETCH TABS UPON LOGIN
const fetchingTabs = () => {
    return {
        type: tabsTypes.FETCHING_TABS
    }
}
const fetchSucceeded = (userTabs) => {
    return {
        type: tabsTypes.FETCH_SUCCEEDED,
        userTabs: userTabs
    }
}
const fetchFailed = () => {
    return {
        type: tabsTypes.FETCH_FAILED
    }
}
export const fetchTabs = (userId) => dispatch => {
    console.log("waiting for proper end point")
    // dispatch(fetchingTabs())
    // axios.get(`tabs/${userId}`).then(res => {
    //     dispatch(fetchSucceeded(res.data))
    // }).catch(err => {
    //     dispatch(fetchFailed())
    //     console.error(err)
    // })
}
// DELETE TAB
const deleteTabSucceeded = (updatedTabs) => {
    return { 
        type: tabsTypes.DELETE_SUCCEEDED,
        updatedTabs: updatedTabs
    }

}
export const deleteTab = (tabId) => dispatch => {
    console.log(tabId)
    // axios.get(`/:${tabId}`).then(res => {
    //     dispatch(deleteTabSucceeded(res.data))
    // }).catch(err => {
    //     console.error(err)
    // })
}
// UPDATE A TAB WITH tabId
const updatingTab = () => {
    return {
        type: tabsTypes.UPDATING_TAB
    }
}
const updateSucceeded = (updatedTabs) => {
    return {
        type: tabsTypes.UPDATE_SUCCEEDED,
        updatedTabs: updatedTabs
    }
}
const updateFailed = () => {
    return {
        type: tabsTypes.UPDATE_FAILED
    }
}
export const updateTab = (updatedTab, tabId) => dispatch => {
    dispatch(updatingTab())
    axios.put(`tabs/${tabId}`).then(res => {
        dispatch(updateSucceeded(res.data))
    }).catch(err => {
        dispatch(updateFailed())
        console.log(err)
    })
}