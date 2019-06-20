import React from 'react'
import CitiesView from './Cities-view'
import PropTypes from 'prop-types'

const Cities = ({ citiesList }) => {
    return <span class="select">
        <select>
            <option> City </option>
            {citiesList.map(pair => {
                return <CitiesView title={pair.city + ', ' + pair.country} active={pair.active} />
            })}
        </select>
    </span>
}

Cities.propTypes = {
    citiesList: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired
}

export default Cities