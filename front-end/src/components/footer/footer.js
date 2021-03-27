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

                <a href="https://www.linkedin.com/company/utmmcss">
                <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </section>

        <section> <span id="copyright-statement">Copyright UTM MCSS - 2021</span></section>
        </footer>
        );
    }
}