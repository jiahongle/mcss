// Description: Container component for the "Upcoming Events" section of the home page
import React from 'react';
import './UpcomingEventsEP.css'
import SmallEvent from './SmallEventCard.js'
import ComposeEventDialog from '../composeEventDialog/composeEventDialog.js'


export default class UpcomingEventsEP extends React.Component {
    newEvent = React.createRef()

    state = {
        loggedIn: false,
        events: []
    }

    emptyEvent = {
        _id: '',
        title: '',
        time: '',
        description: '',
        imgs: [],
        signup: '',
        subevents: []
    }

    componentWillMount() {
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

    openNewEventDialog = () => {
        this.newEvent.current.openDialog();
    }

    render() {
        console.log("UpcomingEventsEP rerendered.")
        return (
            <>
            <ComposeEventDialog ref={this.newEvent} isNew rerenderCallback={this.forceRerender} event={this.emptyEvent}/>
            <div className="title-container">
                <div className="section-title"> 
                    Upcoming Events 
                </div>
                {this.state.loggedIn &&
                <div className="new-event" onClick={this.openNewEventDialog}>
                    New Event
                </div>
                }
            </div>
            <div className="grid-container">
                {this.state.events.map((event) => (
                    <SmallEvent 
                        key={event._id}
                        event={event}
                        loggedIn={this.state.loggedIn}
                        rerenderCallback={this.forceRerender}/>
                ))}
            </div>
            </>
        );
    }
}