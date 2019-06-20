import React from 'react'
import PropTypes from 'prop-types'
import Slideshow from '../../Slideshow'
import Edit from './Edit'
import EditMementos from '../../ManageMementos/EditMementos'


const MementoView = ({ owner, photos, title, description, active, onClick, id, fullAccess, isEditing, isDeleting, remove, value, profilePicture, username, _id }) => {


    if ((typeof (value) === 'string' && title.toLowerCase().includes(value)) || typeof (value) === 'undefined') {
        return <div class="column is-one-quarter"
            style={{
                borderStyle: 'groove'
            }}
        >
            <figure onClick={onClick} id="info" className="image container" style={{ width: '100%' }}>
                <Slideshow slides={photos.map(p => {
                    return {
                        title: '',
                        subtitle: '',
                        image: `/photos/${owner}/${p}`
                    }
                })} id={id} isBox={true} />
                <a style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'hsl(0, 0%, 96%)'
                }} className="subtitle"
                    href={`/citypage/${title.split(',')[0]}`}
                > {title}</a>

                {fullAccess ? <Edit /> : null}
            </figure>
            <div className="content is-small" style={{
                backgroundColor: 'hsl(0, 0%, 96%)',
                margin: 0
            }}>
                {description.length > 150 ? description.slice(0, 150) + '...' : description}
            </div>
            <div className={active ? "modal is-active" : "modal"}>
                <div onClick={onClick} class="modal-background"></div>
                {isDeleting ? <div class="modal-content">
                    <header class="modal-card-head"> <p class="modal-card-title">Confirm Delete</p>
                        <button class="delete" aria-label="close" onClick={onClick}></button></header>

                    <footer class="modal-card-foot">
                        <button className="button is-active" onClick={onClick}> Cancel </button>
                        <button className="button is-danger" onClick={remove}> Delete </button>
                    </footer>
                </div> : (isEditing ? <div class="modal-content">
                    <EditMementos owner={owner} photos={photos} title={title} description={description} id={id} profilePicture={profilePicture} username={username} onClick={onClick} _id={_id} />
                </div> : <div class="modal-content">
                        <header class="modal-card-head" style={{
                            paddingBottom: '6px'
                        }}>
                            <p class="modal-card-title">
                                <article class="media">
                                    <figure class="media-left">
                                        <p class="image is-square" style={{
                                            width: '2.25em',
                                            height: '2.25em'

                                        }}>
                                            <img class="is-rounded" src={profilePicture} style={{
                                                borderColor: 'rgb(0, 209, 178)',
                                                borderStyle: 'groove',
                                                objectFit: 'cover'
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
                        <Slideshow slides={photos.map(p => {
                            return {
                                title: '',
                                subtitle: '',
                                image: `/photos/${owner}/${p}`
                            }
                        })} id={id} isModal={true} />
                        <footer class="modal-card-foot">{description}</footer>
                    </div>)}
                <button onClick={onClick} class="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    } else {
        return null
    }



}


export default MementoView




