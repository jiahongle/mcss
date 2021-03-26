import React from 'react';
import "./pictureCollage.css";
import aa from "./aa.png";
import bb from "./bb.png";
import cc from "./cc.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class PictureCollage extends React.Component {


    
    render() {
        var titleCol = (this.props.colorBorder === "blueBorder") ? "blueText" : "purpText";
        console.log(this.props.images)
        return (
            <div>

                <div className={"pastEventTitle " + titleCol}>{this.props.title}</div>

                <div className={"pastEventsPictureCollage " + this.props.colorBorder}>
                    {this.props.images.map((image) => (
                       <img src={image.link} alt="Logo" className="image" key={image.deletehash} onClick={event => {this.reactToClick(event.target.src)}} />
                    ))
                    }
                </div>
            </div>
        );
    }
}