import React from 'react'
import axios from 'axios'
// import 'bulma/css/bulma.css'
import NavbarOther from '../../components/Navbar/NavbarOther'
import { connect } from 'react-redux'
import { loadData, setSignedIn, setViewer, newSlide } from '../../actions'
import Footer from '../../components/Footer'
import Memento from '../../components/Cards/Mementos'
import Banners from '../../components/Banners'
import Searchbar from '../../components/Searchbar'
import bg from '../../assets/the-colours-of-amsterdam.jpg'

const City = ({ loadData, setSignedIn, setViewer, newSlide }) => {

    axios.get('/users').then(res => {
        setSignedIn(res.data._id)
        setViewer(res.data._id)
    }).catch(err => alert(err))

    axios.get(`/globeData`).then(res => {
        loadData(res.data.map(c => {
            return {
                city: c.city,
                country: c.country,
                popularity: c.popularity
            }
        }), 'CITIES')
    }).catch(err => alert(err))

    axios.get('/mementos').then(res => {
        res.data.map(() => newSlide())
        loadData(res.data, 'MEMENTOS')
    }).catch(err => alert(err))

    return (<div style={{
        backgroundImage: `url(${bg})`
    }}>
        <NavbarOther />
        <Searchbar />
        <Banners />
        <div className="container" style={{
            height: '50vh',
            overflow: 'scroll'
        }}> <Memento />
        </div>
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