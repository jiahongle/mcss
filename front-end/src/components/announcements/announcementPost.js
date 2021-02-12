import React from 'react';
import './announcements.css';

export default class announcementPost extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="announcement-post">
                <p className="post-text"> {this.props.details.title} </p>
                <p className="post-date"> {this.props.details.createdAt} </p>
            </div>
        )
    }
}