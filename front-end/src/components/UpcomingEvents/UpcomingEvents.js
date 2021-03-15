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
        loggedIn: false,
        events: []
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ events: data.data })
            });
        requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        };
        fetch('http://localhost:5000/admins/protected', requestOptions).then(response => {
            if (response.status === 200) {

                this.setState({ loggedIn: true })
            } else {
                console.log("no cookie found")
            }
        });

    }

    forceRerender = () => {
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/events/', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ events: data.data }) //Setting state re-renders the component
            });
    }

    render() {
        return (
            <div className="Main-Container" >
                <div className="Subtitle-Container">
                    <b> Upcoming Events </b>
                    <FontAwesomeIcon className="Calendar-Icon" icon={faCalendarAlt} />
                </div>
                {this.state.events.map((event) => (
                    <Event 
                        key={event._id}
                        event={event}
                        loggedIn={this.state.loggedIn}
                        rerenderCallback={this.forceRerender}/>
                ))}

            </div>
        );
    }
}