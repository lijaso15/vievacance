import React from 'react'
import PropTypes from 'prop-types'
import avatar from '../../assets/tmp.png'
import './Drawer.css'

const DrawerView = ({ _id, username, profilePicture, location, fullAccess }) => {
    return <div className="column is-one-fifth">
        <aside className="menu">
            <h1 className='title has-text-centered'
                style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}
            > {username} </h1>
            <figure id="figure" className="image is-square"
                style={{
                    backgroundColor: 'hsl(0, 0%, 96%)'

                }}
            >
                <img className="is-rounded" src={profilePicture ? profilePicture : avatar} alt=""
                    style={{
                        borderColor: '#00d1b2',
                        borderStyle: 'groove',
                        objectFit: 'cover'
                    }}
                />
            </figure>
            <ul style={{ display: fullAccess ? 'block' : 'none' }} className="menu-list">
                <li><a className={location === '/profile' ?
                    "button has-text-left is-info" :
                    "button has-text-left"} href={'/profile/' + _id}>Profile</a></li>
                <li><a className={location === '/mementos' ?
                    "button has-text-left is-info" :
                    "button has-text-left"} href={"/mementos/" + _id}>Mementos</a></li>
                <li><a className={location === '/settings' ?
                    "button has-text-left is-info" :
                    "button has-text-left"} href={"/settings/" + _id}>Settings</a></li>
            </ul>
        </aside>
    </div>
}

DrawerView.propTypes = {
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
}

export default DrawerView