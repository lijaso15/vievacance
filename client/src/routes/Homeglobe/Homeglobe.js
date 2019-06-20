import React from 'react'
import Navbar from '../../components/Navbar/NavbarHome'
import Globe from '../../components/Globe'
// import Footer from '../../components/Footer'
import Signup from '../../components/Forms/Signup'
import Signin from '../../components/Forms/Signin'
import Footer from '../../components/Footer'

import axios from 'axios'
import { setSignedIn, setViewer } from '../../actions'
import { connect } from 'react-redux'

const Homeglobe = ({ setSignedIn, setViewer }) => {

    window.onload = () => {
        axios.get('/users').then(res => {
            setSignedIn(res.data._id)
            setViewer(res.data._id)
        }).catch(err => alert(err))
    }



    return <div>
        <Navbar />
        <Globe />
        <Signin />
        <Signup />
        <Footer />
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        setSignedIn: (id) => dispatch(setSignedIn(id)),
        setViewer: id => dispatch(setViewer(id))
    }
}


export default connect(null, mapDispatchToProps)(Homeglobe)

