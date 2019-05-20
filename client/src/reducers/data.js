const data = (state = {
    city: {
        city: '',
        country: '',
        popularity: 100,
        paragraphs: ['', '', ''],
        images: ['', '', '']
    }
}, action) => {
    switch (action.type) {
        case 'CITY':
            return { ...state, city: action.data }
        default:
            return state
    }
}

export default data