import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './routes/Landing'
import Homeglobe from './routes/Homeglobe'
// import Citypage from './routes/Citypage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEnvelope, faKey, faCheck, faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { connect } from 'react-redux'
import { signedIn } from './actions'
import City from './routes/City'


library.add(faUser, faEnvelope, faKey, faCheck, faHeart)

class App extends Component {

    componentDidMount() {
        axios.get('/users').then(res => {
            signedIn(res.data)
        })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Landing} />
                <Route path="/homeglobe" component={Homeglobe} />
                <Route path="/citypage" component={Citypage} />
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signedIn: id => dispatch(signedIn(id))
    }
}

function Citypage({ match }) {
    return (
        <Route path={`${match.path}/:id`} component={City} />
    );
}



export default connect(null, mapDispatchToProps)(App)