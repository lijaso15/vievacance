import React from 'react'
import PropTypes from 'prop-types'


const PhotoCardsView = ({ owner, id, onClick, active }) => {
    return <div class="column is-one-quarter" onClick={onClick}>
        <figure className="image container" style={{ width: '100%' }}>
            <img style={{
                borderStyle: 'groove'
            }} src={`/photos/${owner}/${id}`} alt="" />
            <input className="check" defaultChecked={active}
                type="checkbox" style={{ position: 'absolute', right: '4px', bottom: '4px' }} />
        </figure>
    </div>
}


PhotoCardsView.propTypes = {
    owner: PropTypes.string,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}



export default PhotoCardsView