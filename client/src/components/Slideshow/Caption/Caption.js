import React from 'react'
import PropTypes from 'prop-types'

const Caption = ({ title, subtitle }) => {
    return <section style={{
        position: 'absolute',
        top: '40%',
        left: '20%',
        color: '#fff'
    }}
    >
        <h1> {title} </h1>
        <h4> {subtitle} </h4>

    </section>
}

Caption.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
}

export default Caption