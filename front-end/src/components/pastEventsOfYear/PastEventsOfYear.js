import React from 'react';
import "./pastEventsYear.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import PictureCollage from "../PictureCollage/pictureCollage.js";


export default class PastEventsSection extends React.Component {

    assignBorderColor(b) {
        return (b)? "blueBorder" : "purpleBorder";
    }

    render() {

        var isBlueBorder = true;
        return (
            <div>
                <div class="yearTitle">&mdash;&mdash;&mdash;
                {this.props.title} &mdash;&mdash;&mdash;</div>
                

                {
                // loop through all event titles
                }
                 <PictureCollage title="Hackathon" colorBorder = {this.assignBorderColor(isBlueBorder)}/>
                {isBlueBorder = !isBlueBorder}
                
            </div>
        );
    }
}