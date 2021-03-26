import React from 'react';
import './logoBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default class LogoBar extends React.Component {
    render() {
        return (
            <div className="logo-bar-container">
                
                <a href="https://www.facebook.com/utmmcss/">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                
                <a href="https://discord.com/invite/5K3TuF7DkY">
                    <FontAwesomeIcon icon={faDiscord} />
                </a>

                
                <a href="https://www.instagram.com/utmmcss/">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>

                
                <a href="https://twitter.com/utmmcss">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
        )
    }
}