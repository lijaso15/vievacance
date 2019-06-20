import React from 'react'
import PropTypes from 'prop-types'
//presentational component
// import log from '../utils/log'


const Dot = ({ onClick, active, isHorizontal }) => {
    return <span style={{
        cursor: 'pointer',
        height: '15px',
        width: '15px',
        margin: '0 2px',
        borderRadius: '50%',
        display: isHorizontal ? 'inline-block' : 'block',
        transition: 'background-color 0.6s ease',
        backgroundColor: active ? 'grey' : '#bbb'
    }} onClick={onClick}
    >  </span>
}

Dot.propTypes = {
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
}

export default Dot