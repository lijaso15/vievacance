import React from 'react'
import Drawer from '../../components/Drawer'
import Footer from '../../components/Footer'
import NavbarOther from '../../components/Navbar/NavbarOther'
import { setSignedIn, setViewer, setOwner, loadData, newSlide, setError } from '../../actions'
import { connect } from 'react-redux'
import axios from 'axios'
import Memento from '../../components/Cards/Mementos'



const ProfileView = ({ setSignedIn, setOwner, setViewer, match, fullAccess, loadData, newSlide, setError, wasCalled }) => {

    window.onload = () => {
        axios.get('/users').then(res => {
            axios.get(`/users/${match.params.id}`).then(r => {
                setSignedIn(res.data._id)
                setViewer(res.data._id)
                setOwner(r.data)
            }).catch(err => alert(err))

        }).catch(err => alert(err))



        if (!wasCalled) {
            axios.get(`/mementos/user/${match.params.id}`).then(res => {
                if (res.status === 200) {
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
                } else {
                    alert(res)
                }
            }).catch(err => alert(err))
        }
        setError('ERR_PROFILE')
    }

    return (
        <div>
            <NavbarOther />
            <div className='columns'
                style={{
                    minHeight: '-webkit-fill-available',
                    paddingTop: '3.25rem'
                }}>
                <Drawer location='/profile' fullAccess={fullAccess} />
                <Memento fullAccess={fullAccess} />
                <div className='column is-1'> </div>

            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => {
    if (!state.perspective.owner._id) {
        return {
            wasCalled: state.err.profile,
            fullAccess: true
        }
    } else {
        return {
            wasCalled: state.err.profile,
            fullAccess: (state.perspective.viewer === state.perspective.owner._id)
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSignedIn: id => dispatch(setSignedIn(id)),
        setOwner: id => dispatch(setOwner(id)),
        setViewer: id => dispatch(setViewer(id)),
        loadData: (id, label) => dispatch(loadData(id, label)),
        newSlide: () => dispatch(newSlide()),
        setError: (label) => dispatch(setError(label))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)


