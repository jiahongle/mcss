import React from 'react';
import './announcements.css';

export default class announcementPost extends React.Component {
    render() {
        return (
            <div className="announcement-post">
                <p className="post-text"> Some announcements Lorem ipsum dolor sit amet, consetetur ... </p>
                <p className="post-date"> Feb 3, 2021 at 1:05pm </p>
            </div>
        )
    }
}