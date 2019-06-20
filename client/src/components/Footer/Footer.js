import React from 'react'
// import PropTypes from 'prop-types'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

const Footer = ({ viewer }) => {
    return <footer className="footer has-background-grey">
        <div className="container">
            <div className="columns">
                <div className="column">
                    <div className="footer-logo">
                        <img style={{ height: '40px' }} alt="" src={logo} />
                    </div>
                    <ul className="link-list">
                        <li id="footer-links"> © VieVacance </li>
                    </ul>
                </div>
                <div className="column">
                    <div className="footer-column">
                        <div className="footer-header has-text-white">
                            <h3>App Info</h3>
                        </div>
                        <ul className="link-list">
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="/">Landing</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="/homeglobe">Home</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="/explore">Explore</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href={viewer ? "/profile" + '/' + viewer : "/homeglobe"}  >Profile</a></li>
                        </ul>
                    </div>
                </div>
                <div className="column">
                    <div className="footer-column">
                        <div className="footer-header has-text-white">
                            <h3>Credits</h3>
                        </div>
                        <ul className="link-list">
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="https://github.com/reduxjs/react-redux">React-Redux</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="https://www.amcharts.com/">Amcharts</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="https://bulma.io/">Bulma</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="https://www.crummy.com/software/BeautifulSoup/bs4/doc/">Beautifulsoup</a></li>
                            <li><a id="footer-links" style={{ color: 'hsl(0, 0%, 71%)' }} href="https://www.mongodb.com/">MongoDb</a></li>
                        </ul>
                    </div>
                </div>
                <div className="column">
                    <div className="footer-column">
                        <div className="footer-header has-text-white">
                            <h3>Contact</h3>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <a className="level-item" href="https://lijaso15.github.io/">
                                        <FontAwesomeIcon style={{ color: 'hsl(48, 100%, 67%)' }} icon={['fab', 'github']} />
                                    </a>
                                    <a className="level-item" href="https://www.linkedin.com/in/jason-li-32652b162/">
                                        <FontAwesomeIcon style={{ color: 'hsl(48, 100%, 67%)' }} icon={['fab', 'linkedin']} />
                                    </a>
                                </div>
                            </nav>
                            <ul className="link-list">
                                <li>jasonlimale.li@mail.utoronto.ca</li>
                                <li>(647)-562 4730</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}

const mapStateToProps = state => {
    return {
        viewer: state.perspective.viewer
    }
}


export default connect(mapStateToProps)(Footer) 