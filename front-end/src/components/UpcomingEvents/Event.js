// Description: A specific event component, displaying the title, date, short description, a picture and along with
// some buttons to redirect to the events full page and to register.
import React from 'react'
import eventpic from '../../res/the-show.png';


/* Event function requires a title, date and description to be created */
function Event(props) {
    return (
        <div className="Main-Event-Container">
            <div className="Event-Text">
                <div>
                    <b className="Event-Title"> {props.title} </b>
                    <p className="Event-Text-Date"> {props.date} </p>
                    <p className="Event-Text-Desc"> {props.description} </p>
                </div>
                <div className="Event-Buttons">
                    <button type="button" className="LearnMore-Button"> Learn More </button>
                    <button type="button" className="Register-Button"> Register </button>
                </div>
            </div>
            <div className="Event-Picture">
                <img src={eventpic}/>
            </div>
        </div>
    );
}

export default Event;