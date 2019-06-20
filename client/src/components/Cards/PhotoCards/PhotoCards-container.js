import PhotoCardsView from './PhotoCards-view'
import React from 'react'


const PhotoCards = ({ photos, owner, updateData }) => {

    if (!photos.length) {
        return <div className="column"> <article className="message is-warning is-small">
            <div className="message-body">
                You do not have any photos.
    <a href={"/settings/" + owner}> click here </a>
                to upload
</div>
        </article>
        </div>
    } else {

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


}



export default PhotoCards



