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
            if (res.data.length) {
                res.data.map((mem) => {
                    newSlide()
                    axios.get(`/users/${mem.owner}`).then(r => {
                        loadData({
                            ...mem,
                            username: r.data.username,
                            profilePicture: r.data.profilePicture
                        }, 'MEMENTOS')
                    })
                })
            }
        }).catch(err => alert(err))
    }


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