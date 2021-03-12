import React from 'react'
import { Link } from 'react-router-dom';
import './navBar.css'
import mcssLogo from '../../mcssLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default class Nav extends React.Component {
  state = {
    menuActive: false
  }

  toggleMenuActive = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {
    return (
      <div className="menu-container">
        <div className={this.state.menuActive ? 'menu active' : 'menu'}>
          <div className="blank" />
          <div className="mcss-logo-container">
            <img src={mcssLogo} className="mcss-logo" />
          </div>
          <div className="content-wrap">
            <ul className="extra">
              <li className="nav-text">
                <Link to="/">
                  <span> Home </span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/team">
                  <span> The Team </span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/announcements">
                  <span> Announcements </span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/events">
                  <span> Events </span>
                </Link>          </li>
              <li className="nav-text">
                <Link to="/partnerClubs">
                  <span> Partner Clubs </span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="">
                  <span> Shopify </span>
                </Link>
              </li>
            </ul>
            <div className="social-media">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faDiscord} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}