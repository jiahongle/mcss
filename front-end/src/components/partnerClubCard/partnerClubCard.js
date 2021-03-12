import React from "react"
import "./partnerClubCard.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faFacebook, faDiscord, faInstagramSquare } from "@fortawesome/free-brands-svg-icons"
import {faGlobe} from "@fortawesome/free-solid-svg-icons"

export default class PartnerClubCard extends React.Component {
    render() {
    var insta = ""; try {insta = this.props.insta} catch {}
    var facebook = ""; try {facebook = this.props.facebook} catch {}
    var discord = ""; try {discord = this.props.discord} catch {}
    var linkedin = ""; try {linkedin = this.props.linkedin} catch {}
    var website = ""; try {website = this.props.website} catch {}
    var linksArr = [];


    if (insta) {
        linksArr.push(<a key="1" target="_blank" rel="noopener noreferrer" href={insta}> <FontAwesomeIcon icon={faInstagramSquare} className="club-link-icon"/></a>);
    }
    if (facebook) {
        linksArr.push(<a key="2" target="_blank" rel="noopener noreferrer" href={facebook}> <FontAwesomeIcon icon={faFacebook} className="club-link-icon"/></a>);
    }    
    if (discord) {
        linksArr.push(<a key="3" target="_blank" rel="noopener noreferrer" href={discord}> <FontAwesomeIcon icon={faDiscord} className="club-link-icon"/></a>);
    } 
    if (linkedin) {
        linksArr.push(<a key="4" target="_blank" rel="noopener noreferrer" href={linkedin}> <FontAwesomeIcon icon={faLinkedin} className="club-link-icon"/></a>);
    } 
    if (website) {
        linksArr.push(<a key="5" target="_blank" rel="noopener noreferrer" href={website}> <FontAwesomeIcon icon={faGlobe} className="club-link-icon"/></a>);
    } 

    return(
        <div className="club-card-body">
            <img src={this.props.pfpLink} alt="" className="club-pfp"></img>
            <div className="club-card-links">
                {linksArr}
            </div>
        </div>
    );
    }
}
