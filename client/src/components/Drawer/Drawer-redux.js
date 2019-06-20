import { connect } from 'react-redux'
import Drawer from './Drawer-container'

const mapStateToProps = state => {
    const { username, profilePicture, _id } = state.perspective.owner
    return {
        owner: { username, profilePicture, _id }
    }
}

export default connect(mapStateToProps)(Drawer)




