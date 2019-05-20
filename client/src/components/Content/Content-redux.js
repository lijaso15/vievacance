import { connect } from 'react-redux'
import Content from './Content-container'

const mapStateToProps = state => {
    const { paragraphs, images } = state.data.city
    return {
        onLoad: { paragraphs, images }
    }
}

export default connect(mapStateToProps)(Content)