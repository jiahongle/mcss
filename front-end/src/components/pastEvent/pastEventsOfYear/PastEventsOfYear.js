import React from 'react';
import "./pastEventsYear.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import PictureCollage from "../PictureCollage/pictureCollage.js";


export default class PastEventsSection extends React.Component {

    assignBorderColor(b) {
        return (b) ? "blueBorder" : "purpleBorder";
    }

    render() {

        var isBlueBorder = true;
        return (
            <div>
                <div class="yearTitle">&mdash;&mdash;&mdash;
                {this.props.year} &mdash;&mdash;&mdash;</div>
                


                {isBlueBorder = !isBlueBorder}

            </div>
        );
    }
}