import SearchbarView from './Searchbar-view'
import React from 'react'

const Searchbar = ({ setFilter }) => {
    return <SearchbarView handleChange={setFilter} />
}


export default Searchbar