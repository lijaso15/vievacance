

function toggles(state = {
    signin: true,
    signup: true,
    navbar: false,
    burger: false,
    editing: false,
    deleting: false,
    value: ''
}, action) {
    switch (action.type) {
        case 'TOGGLE_SIGNIN_BUTTON':
            return { ...state, signin: !state.signin }
        case 'TOGGLE_SIGNUP_BUTTON':
            return { ...state, signup: !state.signup }
        case 'TOGGLE_BURGER':
            return { ...state, burger: !state.burger }
        case 'SIGNED_IN':
            return {
                ...state,
                signin: false,
                signup: false,
                navbar: true,
            }
        case 'NOT_SIGNED_IN':
            return {
                ...state,
                signin: true,
                signup: true,
                navbar: false,
            }
        case 'EDITING':
            return {
                ...state,
                editing: true
            }
        case 'DELETING':
            return {
                ...state,
                deleting: true
            }
        case 'FILTER':
            return {
                ...state,
                value: action.value
            }
        default:
            return state
    }
}

export default toggles