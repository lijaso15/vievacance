
const err = (state = {
    signin: false,
    profile: false,
    edit: false,
    message: ''
}, action) => {
    switch (action.type) {
        case 'ERR_SIGNED_IN':
            return { ...state, signin: true } // set display to on, message, touched
        case 'ERR_SIGNED_IN_CLEARED':
            return { ...state, signin: false }
        case 'ERR_PROFILE':
            return { ...state, profile: true }
        case 'ERR_EDIT':
            if (action.message) {
                return { ...state, message: action.message }
            } else {
                return { ...state, edit: true }
            }
        default:
            return state
    }
}
export default err