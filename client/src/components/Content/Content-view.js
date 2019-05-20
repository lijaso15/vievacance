import React from 'react'
import PropTypes from 'prop-types'
import './content.css'

const ContentView = ({ images, paragraphs }) => {
    console.log(paragraphs)
    return <div>
        <article className="media">
            <div className="media-content">
                <div className="content">
                    <p> {paragraphs[0]}</p>
                </div>
            </div>
            <figure id="image" className="media-right">
                <p className="image"></p>
                <img alt="" src={images[0]} />
            </figure>
        </article>
        <article className="media">
            <figure id="image" className="media-left">
                <p className="image">
                    <img alt="" src={images[1]} />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p> {paragraphs[1]}</p>
                </div>
            </div>
        </article>
        <article className="media">
            <div className="media-content">
                <div className="content">
                    <p> {paragraphs[2]}</p>
                </div>
            </div>
            <figure id="image" className="media-right">
                <p className="image">
                    <img alt="" src={images[2]} />
                </p>
            </figure>
        </article>
    </div>
}

ContentView.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    paragraphs: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired
}


export default ContentView