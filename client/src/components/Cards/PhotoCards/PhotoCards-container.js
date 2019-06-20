import PhotoCardsView from './PhotoCards-view'
import React from 'react'


const PhotoCards = ({ photos, owner, updateData }) => {
    return <div id="info" className="columns is-gapless is-multiline is-mobile">
        {photos.map(photo => {
            return <PhotoCardsView onClick={() =>
                updateData(photos.map(p => p.id === photo.id ?
                    { ...p, active: !p.active } : p), 'PHOTOS')}
                {...photo} owner={owner}
            />
        })}
    </div>

}



export default PhotoCards



