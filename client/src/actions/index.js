
// /src/actions/index

export const nextSlide = (index) => {
    return {
        type: 'NEXT_SLIDE',
        index
    }
}

export const prevSlide = (index) => {
    return {
        type: 'PREV_SLIDE',
        index
    }
}

export const skipTo = (index) => {
    return {
        type: 'SKIP_TO',
        index
    }
}

export const authenticationError = () => {
    return {
        type: 'ERR_SIGNED_IN'
    }
}

export const errorCleared = () => {
    return {
        type: 'ERR_SIGNED_IN_CLEARED',
    }
}

export const userHasLoggedOut = () => {
    return {
        type: 'USER_HAS_LOGGED_OUT'
    }
}

export const toggleSignInButton = () => {
    return {
        type: 'TOGGLE_SIGNIN_BUTTON'
    }
}

export const toggleSignUpButton = () => {
    return {
        type: 'TOGGLE_SIGNUP_BUTTON'
    }
}

export const signedIn = (id) => {
    if (id) {
        return {
            type: 'SIGNED_IN',
            id
        }
    }
    return {
        type: 'NOT_SIGNED_IN',
        id
    }
}

export const loadData = (data, label) => {
    console.log(data)
    return {
        type: label,
        data
    }
}