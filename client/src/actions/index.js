
// /src/actions/index
// POSITION
export const newSlide = () => {
    return {
        type: 'NEW_SLIDE'
    }
}

export const nextSlide = (id) => {
    return {
        type: 'NEXT_SLIDE',
        id
    }
}

export const prevSlide = (id) => {
    return {
        type: 'PREV_SLIDE',
        id
    }
}

export const skipTo = (index, id) => {
    return {
        type: 'SKIP_TO',
        index,
        id
    }
}

// ERRORS
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

export const setError = (label, message = '') => {
    return {
        type: label,
        message
    }
}


//TOGGLES
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

export const toggleBurger = () => {
    return {
        type: 'TOGGLE_BURGER'
    }
}

export const setSignedIn = (id) => {
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

export const setFilter = value => {
    return {
        type: 'FILTER',
        value
    }
}


export const setEditing = () => {
    return { type: 'EDITING' }
}
export const setDeleting = () => {
    return { type: 'DELETING' }
}


//DATA
export const loadData = (data, label) => {
    return {
        type: label,
        data
    }
}

export const updateData = (data, label) => {
    return {
        type: 'UPDATE_' + label,
        data
    }
}


// PERSPECTIVE 
export const setOwner = (owner) => {
    return {
        type: 'OWNER',
        owner
    }
}
export const setViewer = (id) => {
    return {
        type: 'VIEWER',
        id
    }
}

//EMPTY
export const setEmpty = (label, val) => {
    return {
        type: label,
        val
    }
}