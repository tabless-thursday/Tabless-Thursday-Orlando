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
    axios.post(`tabs/${userId}`, tabData).then(res => {
        const transformedTabs = res.data.map(tab => ({...tab, tabId: tab._id}))
        dispatch(addSucceeded(transformedTabs))
    }).catch(err => {
        dispatch(addFailed())
        console.error(err)
    })
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
    dispatch(fetchingTabs())
    axios.get(`tabs/${userId}`).then(res => {
        const transformedTabs = res.data.map(tab => ({...tab, tabId: tab._id}))
        dispatch(fetchSucceeded(transformedTabs))
    }).catch(err => {
        dispatch(fetchFailed())
        console.error(err)
    })
}
// DELETE TAB
const deleteTabSucceeded = (tabId) => {
    return { 
        type: tabsTypes.DELETE_SUCCEEDED,
        tabId: tabId
    }

}
export const deleteTab = (tabId) => dispatch => {
    axios.delete(`/tabs/${tabId}`).then(res => {
        dispatch(deleteTabSucceeded(tabId))
    }).catch(err => {
        console.error(err)
    })
}
// UPDATE A TAB WITH tabId
const updatingTab = () => {
    return {
        type: tabsTypes.UPDATING_TAB
    }
}
const updateSucceeded = (updatedTab, tabId) => {
    return {
        type: tabsTypes.UPDATE_SUCCEEDED,
        updatedTab: updatedTab,
        tabId: tabId
    }
}
const updateFailed = () => {
    return {
        type: tabsTypes.UPDATE_FAILED
    }
}
export const updateTab = (updatedTab, tabId) => dispatch => {
    dispatch(updatingTab())
    axios.put(`tabs/${tabId}`, updatedTab).then(res => {
        dispatch(updateSucceeded(updatedTab, tabId))
    }).catch(err => {
        dispatch(updateFailed())
        console.log(err)
    })
}