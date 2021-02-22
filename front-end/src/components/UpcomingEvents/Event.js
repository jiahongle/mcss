// Description: A specific event component, displaying the title, date, short description, a picture and along with
// some buttons to redirect to the events full page and to register.
import React from 'react'
import eventpic from '../../res/the-show.png';
import './Event.css'

/* Defines a container that holds all text within an upcoming event that is expanded */
function ExpandedText(props) {
    return (
        <div>
            <b className="Expanded-Title"> {props.title} </b>
            <p className="Expanded-Date"> {props.date} </p>
            <p className="Expanded-Desc"> {props.description} </p>
        </div>
    )
}

/* Defines a container that holds title and date only when an upcoming event is collapsed */
function CollapsedText(props) {
    return (
        <div className="Collapsed-Text">
            <b className="Collapsed-Title"> {props.title} </b>
            <p className="Collapsed-Date"> {props.date} </p>
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

/* Defines a container holding all the required text and buttons when an event is expanded */
function ExpandedInfo(props) {
    return (
        <div className="Expanded-Info">
            <ExpandedText title={props.title}
                        date={props.date}
                        description={props.description}/>
            <EventButtons/>
        </div>
    );
}

/* A container displayed when an event is collapsed, shows only the title and date */
function CollapsedInfo(props) {
    return (
        <CollapsedText title={props.title}
                        date={props.date}/>
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
        let btn = <button className="Toggle-Button" 
                          onClick={this.toggleCollapse}/>

        if (!this.state.isCollapsed) { // If expanded
            let expandedInfo = <ExpandedInfo title={this.props.title}
                                              date={this.props.date}
                                              description={this.props.description}/>;

            return(
                <div className="Expanded">
                    {expandedInfo}
                    <div className="Expanded-Picture-Button">
                        <div className="Expanded-Button">{btn}</div>
                        <div className="Inner-Picture"><img src={eventpic}/></div>
                    </div>
                </div>
            );

        } else { // If Collapsed
            let collapsedInfo = <CollapsedInfo title={this.props.title}
                                                date={this.props.date}/>;

            return (
                <div className="Collapsed">
                    {collapsedInfo}
                    <div className="Collapsed-Button-Div">
                        {btn}
                    </div>
                </div>
            );
        }
    }
}

export default Event;