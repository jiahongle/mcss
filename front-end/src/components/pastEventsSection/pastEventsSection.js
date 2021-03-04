import React from 'react';
import "./pastEventsSection.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PastEventsOfYear from "../pastEventsOfYear/PastEventsOfYear";

export default class PastEventsSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }
    togglePanel(e){
        this.setState({open: !this.state.open})
    }
    render() {
        var chosenIcon = (this.state.open)? faAngleUp: faAngleDown; 
        
        return (
        <section>
            <div onClick={(e)=>this.togglePanel(e)} className='header'>
                <span id="pastEventsTitle">Past Events</span>
                <FontAwesomeIcon id="pastEventsDropdownIcon"icon={chosenIcon} />    
            </div>
            {this.state.open ? (
                <div className='content'>
                    {
                        // get list of year names, iterate through them

                        <PastEventsOfYear title="2020"/>
                    }
                
                </div>
            ) : null}
        </section>
        );
    }
}