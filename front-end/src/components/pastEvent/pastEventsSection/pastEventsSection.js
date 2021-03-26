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
            ).then(data => {
                this.setState({ pastevents: data.data })
                console.log(data.data)
            })

    }
    render() {
        var chosenIcon = (this.state.open) ? faAngleUp : faAngleDown;
        var pastevents = this.state.pastevents;
        return (
            <section>
                <div onClick={(e) => this.togglePanel(e)} className='header'>
                    <span id="pastEventsTitle">Past Events</span>
                    <FontAwesomeIcon id="pastEventsDropdownIcon" icon={chosenIcon} />
                </div>
                <div>
                    {this.state.open ? (
                        <div className='content'>
                            {pastevents.map((event) => (

                                <PastEventsOfYear title={event.title} key={event._id} images={event.images} year={event.year} />
                            ))}

                        </div>
                    ) : null}
                </div>
            </section>
        );
    }
}