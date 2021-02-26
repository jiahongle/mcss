import React from 'react';
import './eventPost.css';

export default class eventPost extends React.Component {
    render() {

        return (
            <div className="announcement-post">
                <p className="post-text"> {this.props.details.title} </p>
                <p className="post-date"> {this.props.details.createdAt} </p>
            </div>
        )
    }
}