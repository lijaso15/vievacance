import React from 'react'
import PropTypes from 'prop-types'
import Slide from './Slide/Slide'
import Dots from './Dots'
import Caption from './Caption'

const Slideshow = ({ slides, nextSlide, position, id, isBox, isModal }) => {
    return (
        <div className={isModal ? "modal-card-body" : ''}>
            <div onClick={() => {
                if (position < slides.length - 1 && !isBox) {
                    nextSlide(id)
                }
            }}>
                <Slide image={slides[position].image} isBox={isBox} isModal={isModal} />
                <Caption title={slides[position].title}
                    subtitle={slides[position].subtitle} />

            </div>
            <Dots orientation={isModal ? {
                textAlign: 'center'
            } : {
                    top: '40%',
                    position: 'absolute',
                    right: 0
                }} numSlides={slides.length}
                id={id} isHorizontal={isModal} />
        </div>
    )
}

Slideshow.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    nextSlide: PropTypes.func.isRequired,
    prevSlide: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired
}

export default Slideshow


