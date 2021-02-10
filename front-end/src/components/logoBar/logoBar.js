import React from 'react';
import './logoBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default class LogoBar extends React.Component {
    render() {
        return (
            <div className="logo-bar-container">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faDiscord} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
            </div>
        )
    }
}