import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./routes/Landing";
import Homeglobe from "./routes/Homeglobe";
// import Citypage from './routes/Citypage'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faEnvelope,
  faKey,
  faCheck,
  faGlobe,
  faEdit,
  faSearch,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import City from "./routes/City";
import ProfileView from "./routes/Profile";
import SettingsView from "./routes/Settings";
import MementosView from "./routes/Mementos";
import Explore from "./routes/Explore";
import Test from "./components/Test";
import "bulma/css/bulma.css";

library.add(
  faUser,
  faEnvelope,
  faKey,
  faCheck,
  faHeart,
  fab,
  faGlobe,
  faEdit,
  faSearch,
  faHeart,
  far
);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/homeglobe" component={Homeglobe} />
          <Route path="/citypage" component={Citypage} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
          <Route path="/mementos" component={Mementos} />
          <Route path="/explore" component={Explore} />
          <Route path="/test" component={Test} />
          <Route component={notFound} />
        </Switch>
      </Router>
    );
  }
}

function Citypage({ match }) {
  return <Route path={`${match.path}/:id`} component={City} />;
}

function Profile({ match }) {
  return <Route path={`${match.path}/:id`} component={ProfileView} />;
}

function Settings({ match }) {
  return <Route path={`${match.path}/:id`} component={SettingsView} />;
}

function Mementos({ match }) {
  return <Route path={`${match.path}/:id`} component={MementosView} />;
}

function notFound() {
  return (
    <section className="hero is-link is-fullheight">
      <div className="hero-body">
        <div className="container">
          <p className="title">404</p>
          <p className="subtitle">PAGE NOT FOUND</p>
        </div>
      </div>
    </section>
  );
}

export default App;
