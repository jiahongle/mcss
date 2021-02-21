// Description: Container component for the "Upcoming Events" section of the home page
import './UpcomingEvents.css'
import Event from './Event.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

// Testing component
var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ex quam, consectetur " +
                  "eu mattis facilisis, sollicitudin nec enim. Sed id ipsum porta, viverra urna sed, " +
                  "sollicitudin tortor. Morbi id risus eget nulla pulvinar tristique a in eros.";
description += description + description + description + description + description;

var title = "The Show: A Night of the Nerds The Show: A Night of the Nerds The Show: A Night of the Nerds";
var date = "Feb 2nd, 2020";

function UpcomingEvents() {
    return (
        <div className="Main-Container">
            <div className="Subtitle-Container"> 
                <b> Upcoming Events </b>
                <FontAwesomeIcon className="Calendar-Icon" icon={faCalendarAlt}/>
            </div>
            <Event className ="Homepage-Event" 
                   description = {description} 
                   title = {title}
                   date = {date}/>
            <Event className ="Homepage-Event" 
                   description = {description} 
                   title = {title}
                   date = {date}/>
        </div>
    );
}

export default UpcomingEvents;