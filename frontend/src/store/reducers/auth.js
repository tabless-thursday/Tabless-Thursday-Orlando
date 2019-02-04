const initialState = {
    user: {
        _id: null,
        token: null,
        email: null,
        cellnumber: null,
    },
    loading: false,
    authRedirectPath: "/my-tabs"
}

export default (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

