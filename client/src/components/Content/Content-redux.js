import { connect } from 'react-redux'
import Content from './Content-container'
import removeFootnotes from '../../utils/removeFootnotes'

const mapStateToProps = state => {
    const { paragraphs, images } = state.data.city
    return {
        onLoad: { paragraphs: paragraphs.map(p => removeFootnotes(p)), images }
    }
}

export default connect(mapStateToProps)(Content)