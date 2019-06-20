import React from 'react'
import PropTypes from 'prop-types'
import assignColour from '../../../utils/assignColour'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './banner.css'
import { type } from 'os';

const BannerView = ({ city, country, popularity, value }) => {

    if ((typeof (value) === 'string' && (city.toLowerCase().includes(value) || country.toLowerCase().includes(value))) || typeof (value) === 'undefined') {
        return <div
            id="info"
            onClick={() => {
                window.location.replace(`/citypage/${city}`)
            }} style={{
                cursor: 'pointer'
            }}
        >
            <section className={assignColour(popularity)}>
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title" >
                            {city}, {country}
                        </h1>
                        <h2 className="subtitle">
                            #{popularity} most popular destination in the world
                    </h2>
                        {/* <span id="heart" className="icon">
                        <FontAwesomeIcon icon={'heart'} />
                    </span> */}
                    </div>
                </div>
            </section>
        </div>
    } else {
        return null
    }





}

BannerView.propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    popularity: PropTypes.number.isRequired
}

export default BannerView