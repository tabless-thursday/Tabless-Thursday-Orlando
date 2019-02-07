import { tabsTypes } from '../actions/actionTypes';

const initialState = {
    userTabs: [
        {tabId: '1', tabUrl: "google.com", importance:"very useful site", category: "favorites"},
        {tabId: '2', tabUrl: "learn.lambdaschool.com", importance:"school resources", category: "education"},
        {tabId: '3', tabUrl: "youtube.com", importance:"good videos", category: "favorites"},
        {tabId: '4', tabUrl: "northwestern.edu", importance:"cool school", category: "education"},
        {tabId: '5', tabUrl: "twitter.com", importance:"for following cool people", category: "favorites"},
        {tabId: '6', tabUrl: "instagram.com", importance:"for dank pics", category: "favorites"},
        {tabId: '7', tabUrl: "www.spacex.com", importance:"they have cool rockets", category: "space"},
        {tabId: '8', tabUrl: "https://reactjs.org/", importance:"time to learn hocks!", category: "programming"},
    ],
    fetch: {
        fetching: false,
        fetched: false,
        error: null
    },
    add: {
        adding: false,
        added: false,
        error: null
    },
    delete: {
        deleted: false,
    },
    update: {
        updating: false,
        updated: false,
        error: null
    }
}

export default (state = initialState, action) => {
    switch (action.key) {
        case tabsTypes.ADDING_TAB:
            return {
                ...state,
                add: {adding: true, added: false, error: null}
            }
        case tabsTypes.ADD_SUCCEEDED:
            return {
                ...state,
                userTabs: action.newTabs,
                add: {adding: false, added: true, error: null}
            }
        case tabsTypes.ADD_FAILED:
            return {
                ...state,
                add: {adding: false, added: false, error: "Could not add tab"}
            }
        case tabsTypes.FETCHING_TABS:
            return {
                ...state,
                fetch: {fetching: true, fetched: false, error: null}
            }
        case tabsTypes.FETCH_SUCCEEDED:
            return {
                ...state,
                userTabs: action.userTabs,
                fetch: {fetching: false, fetched: true, error: null}
            }
        case tabsTypes.FETCH_FAILED:
            return {
                ...state,
                fetch: {fetching: false, fetched: false, error: "Could not fetch tabs"}
            }
        case tabsTypes.DELETE_SUCCEEDED: 
            return {
                ...state,
                userTabs: action.updatedTabs,
                delete: {deleted: true}
            }
        case tabsTypes.UPDATING_TAB:
            return {
                ...state,
                update: {updating: true, updated: false, error: null},
            }
        case tabsTypes.UPDATE_SUCCEEDED:
            return {
                ...state,
                userTabs: action.updatedTabs,
                update: {updating: false, updated: true, error: null}
            }
        case tabsTypes.UPDATE_FAILED:
            return {
                ...state,
                update: {updating: false, updated: false, error: "Could not update tab"}
            }
        default:
            return state;
    }
}