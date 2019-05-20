import Banner from './Banner-container'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    const { city, popularity, country } = state.data.city
    return {
        onLoad: { city, popularity, country }

    }
}

export default connect(mapStateToProps)(Banner)