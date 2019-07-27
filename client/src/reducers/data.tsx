const data = (state = {
    city: {
        city: '',
        country: '',
        popularity: 100,
        paragraphs: ['', '', ''],
        images: ['', '', '']
    },
    photos: [],
    mementos: [],
    cities: []
}, action) => {
    switch (action.type) {
        case 'CITY':
            return { ...state, city: action.data }
        case 'PHOTOS':
            return { ...state, photos: action.data }
        case 'UPDATE_MEMENTOS':
            return { ...state, mementos: action.data }
        case 'MEMENTOS':
            return { ...state, mementos: [...state.mementos, action.data] }
        case 'CITIES':
            return { ...state, cities: action.data }
        default:
            return state
    }
}

export default data