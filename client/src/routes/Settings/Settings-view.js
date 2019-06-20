import React from 'react'
import axios from 'axios'
import NavbarOther from '../../components/Navbar/NavbarOther'
import { connect } from 'react-redux'
import { setSignedIn, setViewer, setOwner, loadData } from '../../actions'
import Footer from '../../components/Footer'
import Drawer from '../../components/Drawer'
import ChangeSettings from '../../components/ChangeSettings'
import { Redirect } from 'react-router-dom'

const SettingsView = ({ setSignedIn, setOwner, setViewer, match, loadData, access }) => {

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

        // match.params.id is the visitor
        // objective is to compare the visitor with the owner
        axios.get(`/users/${match.params.id}`).then(res => {
            setOwner(res.data)
        }).catch(err => alert(err))

        axios.get(`/photos/${match.params.id}`).then(res => {
            loadData(res.data, 'PHOTOS')
        })
    }

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
                <Drawer location='/settings' fullAccess />
                <ChangeSettings />
                <div className='column is-1'> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)