
const err = (state = { signin: false }, action) => {
    switch (action.type) {
        case 'ERR_SIGNED_IN':
            // console.log({ ...state, signin: true })
            return { ...state, signin: true } // set display to on, message, touched
        case 'ERR_SIGNED_IN_CLEARED':
            console.log({ ...state, signin: false })
            return { ...state, signin: false }
        default:
            return state
    }
}
export default err