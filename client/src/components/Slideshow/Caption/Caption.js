import React from 'react'
import PropTypes from 'prop-types'

const Caption = ({ active, title, subtitle }) => {
    return <section style={{ display: active ? 'block' : 'none' }}
        id="slideshowcaption" className="hero is-primary" >
        <div className="hero-body">
            <div className="container">
                <h1 className="title has-text-centered">
                    {title}
                </h1>
                <h2 className="subtitle has-text-centered">
                    {subtitle}
                </h2>
            </div>
        </div>
    </section>
}

Caption.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}

export default Caption