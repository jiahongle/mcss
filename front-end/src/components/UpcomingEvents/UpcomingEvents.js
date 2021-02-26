// Description: Container component for the "Upcoming Events" section of the home page
import React from 'react';
import './UpcomingEvents.css'
import Event from './Event.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

// Testing component
var description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex quam, consectetur " +
    "eu mattis facilisis, sollicitudin nec enim. Sed id ipsum porta, viverra urna sed, " +
    "sollicitudin tortor. Morbi id risus eget nulla pulvinar tristique a in eros.";
var description2 = description1 + description1 + description1 + description1 + description1;

var title = "The Show: A Night of the Nerds The Show: A Night of the Nerds The Show: A Night of the Nerds";
var date = "Feb 2nd, 2020";

export default class UpcomingEvents extends React.Component {
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
            <div className="Main-Container" >
                <div className="Subtitle-Container">
                    <b> Upcoming Events </b>
                    <FontAwesomeIcon className="Calendar-Icon" icon={faCalendarAlt} />
                </div>
                {this.state.events.map((event) => (
                    <Event description={event.description}
                        key={event._id}
                        title={event.title}
                        date={Date(event.createdAt)} />
                ))}

            </div>
        );
    }
}