import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cities from '../Cities'
import PhotoCards from '../../Cards/PhotoCards'

const CreateMementosView = ({ owner, createMemento, message }) => {
    return <div className="column is-three-quarters">
        <section class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Create your Memento
                    </h1>
                </div>
            </div>
        </section>
        {/* <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
            <ul>
                <li> <span class="tag is-link">City</span> </li>
                <li> <span class="tag is-link">Photos</span> </li>
                <li> <span class="tag is-link">Description</span> </li>
            </ul>
        </nav> */}

        <div class="field" >
            <label style={{
                borderBottom: '3px solid #fafafa'
            }} className="label">Select a City</label>
            <p class="control has-icons-left">
                <Cities />
                <span class="icon is-small is-left">
                    <FontAwesomeIcon icon='globe' />
                </span>
            </p>
        </div>

        <label style={{
            borderBottom: '3px solid #fafafa'
        }} className="label">Select photos</label>

        <PhotoCards owner={owner} />

        <label style={{
            borderBottom: '3px solid #fafafa'
        }} className="label">Add Description </label>

        <div class="control">
            <textarea class="textarea is-primary" placeholder="description"></textarea>
        </div>
        {message ? <article className={message === 'Success!' ? "message is-success is-small" : "message is-danger is-small"}>
            <div className="message-body">
                {message}
            </div>
        </article> : null}
        <button id="info" className="button is-primary" onClick={createMemento}>Post Memento</button>







    </div>
}



export default CreateMementosView