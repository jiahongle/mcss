import React from 'react';
import './banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import '../announcements/announcements.css';

export default class banner extends React.Component {

    render() {

        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>View Upcoming Events</b>
                    <FontAwesomeIcon className="title icon-speaker" icon={faCalendar} />
                </div>
                <div className="event-post">
                    <p className="post-text"> Random info </p>
                    <p className="post-date"> Date </p>

                </div>


            </div>
        )
    }
}
