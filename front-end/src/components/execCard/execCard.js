import React from 'react'
import "./execCard.css"
import pfpImage from "./res/pfp.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import {faEnvelopeSquare} from "@fortawesome/free-solid-svg-icons"
import {faGlobe} from "@fortawesome/free-solid-svg-icons"

export default class ExecCard extends React.Component {
    
    render() {
        var name = ""; try {name = this.props.name} catch {}
        var role = ""; try {role = this.props.role} catch {}
        var linkedin = ""; try {linkedin = this.props.linkedin} catch {}
        var email = ""; try {email = this.props.email} catch {}
        var website = ""; try {website = this.props.website} catch {}
        var pfpLink = pfpImage; try {pfpLink = this.props.pfpLink} catch {}


        var linkedinElem = <div></div>;
        if (linkedin) {
            linkedinElem = <a href={linkedin} target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faLinkedin} className="exec-link-icon"/></a>;
        }
        var emailElem = <div></div>;
        if (email) {
            emailElem = <a href={"mailto:"+email} target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faEnvelopeSquare} className="exec-link-icon"/></a>;
        }
        var websiteElem = <div></div>;
        if (website) {
            websiteElem = <a href={website} target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faGlobe} className="exec-link-icon"/></a>;
        }

        return(
            <div className="exec-card-body">
                <img src={pfpImage} alt="" className="exec-pfp"></img>
                <div className="exec-card-material">
                    <div className="exec-card-texts">
                        <div className="exec-card-name">{name}</div>
                        <div className="exec-card-role">{role}</div>
                    </div>
                    <div className="exec-card-links">
                        {linkedinElem}
                        {emailElem}
                        {websiteElem}
                    </div>
                </div>
            </div>
        )
    }
}
