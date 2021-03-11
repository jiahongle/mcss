import React from 'react';
import "./pictureCollage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class PictureCollage extends React.Component {
    render() {
        var titleCol = (this.props.colorBorder === "blueBorder")? "blueText": "purpText";
        return (
            <div>

                <div className={"pastEventTitle "+titleCol}>{this.props.title}</div>

                <div className={"pastEventsPictureCollage " + this.props.colorBorder}>
                    {
                        // loop through pictures and show them
                        //<img> </img>
                    }
                        <div class="aaaa"></div>
                        <div class="aaaa"></div>
                        <div class="aaaa"></div>
                        <div class="aaaa"></div>
                        <div class="aaaa"></div>
                        <div class="aaaa"></div>
                
                </div>
            </div>
        );
    }
}