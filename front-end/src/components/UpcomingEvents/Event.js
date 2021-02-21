// Description: A specific event component, displaying the title, date, short description, a picture and along with
// some buttons to redirect to the events full page and to register.
import React from 'react'
import eventpic from '../../res/the-show.png';
import './Event.css'

/* Defines a container that can hold all text within an upcoming event  */
function EventText(props) {
    return (
        <div>
            <b className="Event-Title"> {props.title} </b>
            <p className="Event-Date"> {props.date} </p>
            <p className="Event-Desc"> {props.description} </p>
        </div>
    )
}

/* Defines a container with two buttons: Learn More, Register */
function EventButtons() {
    return (
        <div className="Event-Buttons">
            <button type="button" className="LearnMore-Button"> Learn More </button>
            <button type="button" className="Register-Button"> Register </button>
        </div>
    )
}

/* Defines a container holding all the required text when an event is expanded */
function ExpandedText(props) {
    return (
        <div className="Event-Info">
            <EventText title={props.title}
                        date={props.date}
                        description={props.description}/>
            <EventButtons/>
        </div>
    );
}

/* A container holding displayed when an event is collapsed, shows only the title and date */
function CollapsedText(props) {
    return (
        EventText(props)
    );
}


/* Event function requires a title, date and description to be created */
class Event extends React.Component {
    constructor(props) {
        super(props);

        // Component is initially expanded
        this.state = {isCollapsed:false};

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    /* Toggles the state of the event between Collapsed and Expanded */
    toggleCollapse () {
        this.setState(
            state => ({
                isCollapsed: !state.isCollapsed 
            })
        )
    }

    render() {
        // Button that toggles the state of the event component
        let btn = <button className="Collapse-Button" 
                          onClick={this.toggleCollapse}/>

        if (!this.state.isCollapsed) { // If expanded
            let expandedText = <ExpandedText title={this.props.title}
                                              date={this.props.date}
                                              description={this.props.description}/>;

            return(
                <div className="Expanded">
                    {expandedText}
                    <div className="Event-Picture">
                        <img src={eventpic}/>
                        {btn}
                    </div>
                </div>
            );

        } else { // If Collapsed
            let collapsedText = <CollapsedText title={this.props.title}
                                                date={this.props.date}/>;

            return (
                <div className="Collapsed">
                    <div className="Event-Info">
                        {collapsedText}
                        <button onClick={this.toggleCollapse}/>
                    </div>
                </div>
            );
        }
    }
}

export default Event;