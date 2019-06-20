// 1. node "builtin" modules
import React from 'react'
import PropTypes from 'prop-types'

// 2. "external" modules

// 3. "internal" modules
// (if you have configured your path or webpack to handle your internal paths differently)

// 4. modules from a "parent" directory
// import log from '../utils/log'
import Dot from './Dots-view'
// 5. "sibling" modules from the same or a sibling's directory

// 6. "index" of the current directory

const Dots = ({ numSlides, skipTo, position, orientation, isHorizontal, id }) => {
    const arr = []
    for (let i = 0; i < numSlides; i++) {
        arr.push(
            <Dot isHorizontal={isHorizontal} key={i} active={position === i} onClick={() => {
                skipTo(i, id)
            }} />
        )
    }
    return <div style={orientation}> {arr} </div>
}

Dots.propTypes = {
    numSlides: PropTypes.number.isRequired,
    skipTo: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired
}

export default Dots

