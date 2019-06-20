import React from 'react'
import PropTypes from 'prop-types'

const CitiesView = ({ title, active }) => {
    return active ? <option selected> {title} </option> :
        <option > {title} </option>
}


CitiesView.propTypes = {
    title: PropTypes.string.isRequired,
}

export default CitiesView