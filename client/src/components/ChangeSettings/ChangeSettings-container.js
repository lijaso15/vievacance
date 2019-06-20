import React from 'react';
import ChangeSettingsView from './ChangeSettings-view'
import PropTypes from 'prop-types'
import axios from 'axios'

const ChangeSettings = ({ owner, filteredData }) => {
    return <ChangeSettingsView
        changeProfilePicture={() => {
            axios.post(`/users/changeprofilepicture/${owner._id}`, { photoId: filteredData[0].id }).then(res => {
                if (res.status === 200) {
                    window.location.reload()
                }
            })
        }}
        deletePhotos={() => {
            filteredData.map(photo => {
                axios.delete(`/photos/${owner._id}/${photo.id}`)
                    .catch(err => alert(err))
                return photo
            })
            window.location.reload()
        }}
        {...owner} />
}

ChangeSettings.propTypes = {
    owner: PropTypes.shape({
        email: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    })
}


export default ChangeSettings

