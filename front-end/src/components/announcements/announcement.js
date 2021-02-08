import React from 'react';
import './announcements.css';
import AnnouncementPost from './announcementPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"

export default class announcement extends React.Component {
    render() {
        return (
            <div className="announcement-container">
                <div className="title-container">
                    <p className="title"> Announcements </p>
                    <FontAwesomeIcon className="title icon-speaker" icon={faBullhorn} />
                </div>
                <AnnouncementPost />
            </div>
        )
    }
}
