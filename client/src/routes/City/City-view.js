import React from 'react'
import axios from 'axios'
// import 'bulma/css/bulma.css'
import NavbarOther from '../../components/Navbar/NavbarOther'
import Banner from '../../components/Banners/Banner/'
import { connect } from 'react-redux'
import { loadData, setSignedIn, setViewer, newSlide } from '../../actions'
import Content from '../../components/Content'
import Footer from '../../components/Footer'
import Memento from '../../components/Cards/Mementos'


const City = ({ loadData, match, setSignedIn, setViewer, newSlide }) => {

    window.onload = () => {
        axios.get('/users', { withCredentials: true }).then(res => {
            setSignedIn(res.data._id)
            setViewer(res.data._id)
        }).catch(err => alert(err))



        axios.get(`/globeData/${match.params.id}`).then(res => {
            loadData(res.data, 'CITY')
        }).catch(err => alert(err))

        axios.get(`/mementos/city/${match.params.id}`).then(res => {
            if (res.status === 200) {
                res.data.map(() => newSlide())
                loadData(res.data, 'MEMENTOS')
            } else {
                alert(res)
            }
        }).catch(err => {
            alert(err)
        }
        )
    }


    return (<div>
        <NavbarOther />
        <Banner />
        <Content />
        <Memento />
        <Footer />
    </div>)
}

const mapDispatchToProps = dispatch => {
    return {
        setSignedIn: (id) => dispatch(setSignedIn(id)),
        loadData: (id, label) => dispatch(loadData(id, label)),
        setViewer: id => dispatch(setViewer(id)),
        newSlide: () => dispatch(newSlide())
    }
}

export default connect(null, mapDispatchToProps)(City)