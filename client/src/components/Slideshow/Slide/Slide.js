import React from 'react'
import PropTypes from 'prop-types'
//presentational component

const Slide = ({ image, isBox, isModal }) => {
    return (<div className={isBox ? 'image is-square' : ''}>
        <img style={isBox ? {
            objectFit: 'cover'
        } : (isModal ? {
            width: '100%',
            objectFit: 'contain',
            borderStyle: 'groove'
        } : {
                top: 0,
                left: 0,
                width: '100%',
                objectFit: 'cover',
                height: '-webkit-fill-available'
            })} alt=""
            src={image} />
    </div>)
}

Slide.propTypes = {
    image: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}

export default Slide


