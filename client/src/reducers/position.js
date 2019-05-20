


const position = (state = 0, action) => {
    switch (action.type) {
        case 'PREV_SLIDE':
            if (state <= 0) {
                return 0
            } else {
                return state - 1
            }
        case 'NEXT_SLIDE':
            return state + 1
        case 'SKIP_TO':
            return action.index
        default:
            return state
    }
}

export default position