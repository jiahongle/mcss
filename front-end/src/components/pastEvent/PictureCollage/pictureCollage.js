import React from 'react';
import "./pictureCollage.css";
import aa from "./aa.png";
import bb from "./bb.png";
import cc from "./cc.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class PictureCollage extends React.Component {

    images = [aa,bb,cc]

    state = {
        chosenImage : ""
    }


    reactToClick(src) {
        var imgIndex;
        for (imgIndex in this.images) {// this.props.images) {
           // console.log(src,this.images[imgIndex])
            if (src == this.images[imgIndex]) { //this.props.images[imgIndex].link) {
                this.setState({chosenImage : src})
                console.log("mod: ", src)
                return;
            }
        }

        this.setState({chosenImage : ""})
    }
    
    
    render() {
        var titleCol = (this.props.colorBorder === "blueBorder") ? "blueText" : "purpText";
        //console.log(this.props.images)
        return (
            <div>

                <div className={"pastEventTitle " + titleCol}>{this.props.title}</div>

                <div className={"pastEventsPictureCollage " + this.props.colorBorder}>
                   {// {this.props.images.map((image) => (
                     //   <img src={image.link} alt="Logo" className="image" key={image.deletehash} onClick={event => {this.reactToClick(event.target.src)}} />
                    //))
                    //}
                   }

                
                <img src={aa} alt="Logo" className="image" onClick={(event) => {this.reactToClick(event.target.src)}}/>
                <img src={bb} alt="Logo" className="image" onClick={(event) => {this.reactToClick(event.target.src)}}/>
                <img src={cc} alt="Logo" className="image" onClick={(event) => {this.reactToClick(event.target.src)}}/>

                {console.log(this.state.chosenImage)}
                </div>
            </div>
        );
    }
}