import DrawerView from './Drawer-view'
import PropTypes from 'prop-types'
import React from 'react'


const Drawer = ({ location, owner, fullAccess }) => {
    return <DrawerView {...owner} location={location} fullAccess={fullAccess} />
}

Drawer.propTypes = {
    location: PropTypes.string.isRequired,
    owner: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        profilePicture: PropTypes.string.isRequired
    }).isRequired
}

export default Drawer