import React from 'react'
import PropTypes from 'prop-types'
import BannerView from './Banner-view'

const Banner = ({ onLoad }) => {
    return <BannerView city={onLoad.city}
        country={onLoad.country} popularity={onLoad.popularity} />
}

Banner.propTypes = {
    onLoad: PropTypes.object.isRequired
}

export default Banner