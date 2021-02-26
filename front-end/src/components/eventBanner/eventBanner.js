import React from 'react';
import './banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import '../announcements/announcements.css';
import EventPost from "./eventPost.js";


export default class banner extends React.Component {

    state = {
        events: []
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ events: data.data })
            })

    }

    render() {

        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>View Upcoming Events</b>
                    <FontAwesomeIcon className="title icon-speaker" icon={faCalendar} />
                </div>

                {this.state.events.map((event) => (
                    <EventPost details={event} key={event._id} />
                ))}


            </div>
        )
    }
}
