import React from 'react'
import NavbarOther from '../../components/Navbar/NavbarOther'
import Drawer from '../../components/Drawer'
import Footer from '../../components/Footer'
import CreateMementos from '../../components/ManageMementos/CreateMementos'
import axios from 'axios'
import { setSignedIn, setViewer, setOwner, loadData } from '../../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const MementosView = ({ setSignedIn, setOwner, setViewer, match, loadData, access }) => {
    axios.get('/users').then(res => {
        setSignedIn(res.data._id)
        setViewer(res.data._id)

    }).catch(err => alert(err))

    axios.get(`/users/${match.params.id}`).then(res => {
        setOwner(res.data)
    }).catch(err => alert(err))

    axios.get(`/globeData`).then(res => {
        loadData(res.data.map(c => {
            return {
                city: c.city,
                country: c.country
            }
        }), 'CITIES')
    }).catch(err => alert(err))

    axios.get(`/photos/${match.params.id}`).then(res => {
        loadData(res.data, 'PHOTOS')
    })

    if (!access) {
        return <Redirect to="/homeglobe" />
    }

    return (
        <div>
            <NavbarOther />
            <div className='columns'
                style={{
                    minHeight: '-webkit-fill-available',
                    paddingTop: '3.25rem'
                }}>
                <Drawer location='/mementos' fullAccess />
                <CreateMementos />
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    if (!state.perspective.owner._id) {
        return {
            access: true
        }
    } else {
        return {
            access: (state.perspective.viewer === state.perspective.owner._id)
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSignedIn: id => dispatch(setSignedIn(id)),
        setOwner: id => dispatch(setOwner(id)),
        setViewer: id => dispatch(setViewer(id)),
        loadData: (id, label) => dispatch(loadData(id, label))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MementosView)