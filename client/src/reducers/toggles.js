

function toggles(state = {
    signin: true,
    signup: true,
    navbar: false
}, action) {
    switch (action.type) {
        case 'TOGGLE_SIGNIN_BUTTON':
            return { ...state, signin: !state.signin }
        case 'TOGGLE_SIGNUP_BUTTON':
            return { ...state, signup: !state.signup }
        case 'SIGNED_IN':
            // console.log('i should be here')
            // console.log({ signin: false, signup: state.signup })
            // console.log({ ...state })
            // console.log({ ...state, signin: false }) stuff then overwrite
            return {
                signin: false,
                signup: false,
                navbar: true
            }
        case 'NOT_SIGNED_IN':
            return {
                signin: true,
                signup: true,
                navbar: false
            }
        case 'USER_HAS_LOGGED_OUT':
            return {
                signin: true,
                signup: true,
                navbar: false
            }
        default:
            return state
    }
}

export default toggles