import React from "react";
import "./footer.css";
import SignupMailchimp from "../mailchimp/signupMailchimp.js";
import logo from "../../mcssLogo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faDiscord, faInstagram , faLinkedin} from "@fortawesome/free-brands-svg-icons"


export default class Footer extends React.Component {
    render() {
        return (
        <footer>
        <section id="footer-content">
            <div>
                <img id="footer-logo" src={logo} alt="MCSS Logo"/>
                <div id="footer-email-link"> 
                <span> Contact us at <a href="mailto:mcss@utmsu.ca"> mcss@utmsu.ca </a> </span> </div>
            </div>
            <div>
                <SignupMailchimp/>
            </div>
            <div className="logo-bar-container" id="footer-logo-bar">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faDiscord} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faLinkedin} />
            </div>
        </section>

        <section> <span id="copyright-statement">Copyright UTM MCSS - 2021</span></section>
        </footer>
        );
    }
}