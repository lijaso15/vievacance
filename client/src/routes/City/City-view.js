import React from 'react'
import axios from 'axios'
// import 'bulma/css/bulma.css'
import NavbarOther from '../../components/Navbar/NavbarOther'
import Banner from '../../components/Banner'
import { connect } from 'react-redux'
import { loadData } from '../../actions'
import Content from '../../components/Content'

const City = ({ loadData, match }) => {
    axios.get(`/globeData/${match.params.id}`).then(res => {
        loadData(res.data, 'CITY')
    }).catch(err => alert(err))
    return (<div>
        <NavbarOther />
        <Banner />
        <Content />
    </div>)
}

const mapDispatchToProps = dispatch => {
    return {
        loadData: (id, label) => dispatch(loadData(id, label))
    }
}

export default connect(null, mapDispatchToProps)(City)