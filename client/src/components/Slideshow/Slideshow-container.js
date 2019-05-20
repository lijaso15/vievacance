import React from 'react'
import PropTypes from 'prop-types'
import Slide from './Slide/Slide'
import { Redirect } from 'react-router-dom'
import Dots from './Dots'
import Caption from './Caption'
import 'bulma/css/bulma.css'
import './slideshow.css'

const Slideshow = ({ slides, nextSlide, position, prevSlide }) => {
    if (position === slides.length) {
        return <Redirect to="/homeglobe" />
    }
    function scroll(event) {
        event.preventDefault();

        if (event.deltaY < 0 && position > 0) {
            // up
            prevSlide(position)
        }
        else if (event.deltaY > 0 && position < slides.length - 1) {
            // down
            nextSlide(position)
        }
    }
    window.onwheel = scroll;
    return (
        <div>
            <div onClick={() => nextSlide(position)}>
                {slides.map((slide, index) => {
                    return <Slide key={index}
                        active={position === index} image={slide.image}
                    />
                })}
                <div className="captions">
                    {slides.map((caption, index) => {
                        return <Caption key={index}
                            active={position === index} title={caption.title} subtitle={caption.subtitle}
                        />
                    })}
                </div>
            </div>
            <Dots numSlides={slides.length} />
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


