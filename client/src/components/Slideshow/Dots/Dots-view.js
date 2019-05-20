import React from 'react'
import PropTypes from 'prop-types'
//presentational component
// import log from '../utils/log'


const Dot = ({ onClick, active }) => {
    return <span className="dot" onClick={onClick}
        style={{
            backgroundColor: active ? 'grey' : '#bbb'
        }}>  </span>
}

Dot.propTypes = {
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
}

export default Dot