import { connect } from 'react-redux'
import ChangeSettings from './ChangeSettings-container'

const mapStateToProps = state => {
    const { _id, username, email } = state.perspective.owner
    return {
        owner: { _id, username, email },
        filteredData: state.data.photos.filter(p => p.active)
    }
}

export default connect(mapStateToProps)(ChangeSettings)