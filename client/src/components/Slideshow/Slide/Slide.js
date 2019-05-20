import React from 'react'
import PropTypes from 'prop-types'
//presentational component

const Slide = ({ image, active }) => {
    return (<div>
        <img className="slides" alt=""
            style={{ display: active ? 'block' : 'none' }}
            src={image} />
    </div>)
}

Slide.propTypes = {
    image: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}

export default Slide
