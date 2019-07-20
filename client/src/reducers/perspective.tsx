const perspective = (state = {
    owner: {
        _id: '',
        email: '',
        username: '',
        profilePicture: '',
        isAdmin: ''
    },
    viewer: false
}, action) => {
    // assume the page is being viewed by an outsider
    switch (action.type) {
        case 'OWNER':
            return { ...state, owner: action.owner }
        case 'VIEWER':
            return { ...state, viewer: action.id }
        default:
            return state
    }
}

export default perspective