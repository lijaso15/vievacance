import React from 'react'
import PhotoCards from '../../Cards/PhotoCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cities from '../Cities'

const EditMementosView = ({ owner, description, profilePicture, username, editMemento, onClick, message }) => {

    return <div class="modal-content">
        <header class="modal-card-head" style={{
            paddingBottom: '6px'
        }}>
            <p class="modal-card-title">
                <article class="media">
                    <figure class="media-left">
                        <p class="image" style={{
                            width: '2.25em',
                            height: '2.25em',
                            objectFit: 'cover'
                        }}>
                            <img class="is-rounded" src={profilePicture} style={{
                                borderColor: 'rgb(0, 209, 178)',
                                borderStyle: 'groove'
                            }} />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content" style={{ paddingTop: '1rem' }}>
                            <a href={`/profile/${owner}`}> {username} </a>
                        </div>
                    </div>
                </article>
            </p>
        </header>

        <div className="modal-card-body">
            <div class="field" >
                <p class="control has-icons-left">
                    <Cities />
                    <span class="icon is-small is-left">
                        <FontAwesomeIcon icon='globe' />
                    </span>
                </p>
            </div>
            <PhotoCards owner={owner} />

            <div class="control">
                <textarea class="textarea is-primary" placeholder="description">
                    {description}
                </textarea>
            </div>
            {message ? <article className={message === 'Success!' ? "message is-success is-small" : "message is-danger is-small"}>
                <div className="message-body">
                    {message}
                </div>
            </article> : null}
        </div>
        <footer class="modal-card-foot">
            <button id="info" className="button" onClick={onClick}>Cancel</button>
            <button id="info" className="button is-primary" onClick={editMemento}>Edit Memento</button>
        </footer>
    </div>
}


export default EditMementosView