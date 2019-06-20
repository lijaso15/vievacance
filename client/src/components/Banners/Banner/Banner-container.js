import React from 'react'
import PropTypes from 'prop-types'
import BannerView from './Banner-view'

const Banner = ({ onLoad, id, value }) => {
    return <BannerView city={onLoad.city}
        country={onLoad.country} popularity={onLoad.popularity}
        value={value.toLowerCase()}
    />
}

Banner.propTypes = {
    onLoad: PropTypes.object.isRequired
}

export default Banner