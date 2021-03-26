// Description: Container component for the "Upcoming Events" section of the home page
import React from 'react';
import './UpcomingEvents.css'
import Event from './Event.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



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
                    <div className="section-title"> Upcoming Events </div>
                    <FontAwesomeIcon className="Calendar-Icon" icon={faCalendarAlt} />
                </div>
                {this.state.events.slice(0, 3).map((event) => (
                    <Event 
                        key={event._id}
                        event={event}
                        loggedIn={this.state.loggedIn}
                        rerenderCallback={this.forceRerender}/>
                ))}
                <div className="see-all">
                    <Link to={'/events'}>
                        See all
                    </Link>
                </div>
            </div>
        );
    }
}