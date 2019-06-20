import React from 'react'
// import PropTypes from 'prop-types'
import ContentView from './Content-view'

const Content = ({ onLoad }) => {
    return <ContentView images={onLoad.images} paragraphs={onLoad.paragraphs} />
}

// Content.propTypes = {
//     onLoad: PropTypes.objectOf({
//         images: PropTypes.arrayOf(
//             PropTypes.string.isRequired
//         ).isRequired,
//         paragraphs: PropTypes.arrayOf(
//             PropTypes.string.isRequired
//         ).isRequired
//     }).isRequired
// }

export default Content