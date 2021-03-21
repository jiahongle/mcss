import React from 'react';
import "./pastEventsSection.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PastEventsOfYear from "../pastEventsOfYear/PastEventsOfYear";
import PictureCollage from "../PictureCollage/pictureCollage.js";

export default class PastEventsSection extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            pastevents: []
        }
        this.togglePanel = this.togglePanel.bind(this);
    }
    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/pastevents/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => 
                this.setState({ pastevents: data.data
                })
            )
    }
    assignBorderColor(b) {
        return (b) ? "blueBorder" : "purpleBorder";
    }

    createEvents(pastevents, isBlueBorder){
        let posts = []; 
        for (var i of Object.keys(pastevents).sort(function(a,b){
            return a < b;
        })){
            posts.push("<div>")
            posts.push(<PastEventsOfYear year={i} />)
            pastevents[i].map((event) => (
                
                posts.push(<PictureCollage images={event.images} title={event.title} colorBorder={this.assignBorderColor(isBlueBorder)} />)
            ))
        }
        posts.push("</div>")

        console.log(posts)
        return posts
    }

    render() {
        var chosenIcon = (this.state.open) ? faAngleUp : faAngleDown;
        var pastevents = this.state.pastevents;
        
        var isBlueBorder = true;
        
        console.log(this.state.pastevents)
        return (
            <section>
                <div onClick={(e) => this.togglePanel(e)} className='header'>
                    <span id="pastEventsTitle">Past Events</span>
                    <FontAwesomeIcon id="pastEventsDropdownIcon" icon={chosenIcon} />
                </div>
                <div>
                    {this.state.open ? (
                        <div className='content'>
                            

                            {this.createEvents(this.state.pastevents,isBlueBorder)}
                            


                        </div>
                    ) : null}
                </div>
            </section>
        );
    }
}