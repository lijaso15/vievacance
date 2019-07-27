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
        function waitForUser(done) {
            if (done) {
                setSignedIn(done)
                setViewer(done)
                return
            }
            axios.get('/users', { withCredentials: true }).then(res => {
                // setSignedIn(res.data._id)
                // setViewer(res.data._id)
                waitForUser(res.data._id)
            }).catch(err => alert(err))
        }
        waitForUser(false)
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

