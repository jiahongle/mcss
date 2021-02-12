import React from 'react';
import './announcements.css';
import AnnouncementPost from './announcementPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"

export default class announcement extends React.Component {

    state = {
        announcements: []
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ announcements: data.data })
            })
        console.log("fetching...")
    }


    render() {
        console.log(this.state)
        return (
            <div className="announcement-container">
                <div className="title-container">
                    <b>Announcements</b>
                    <FontAwesomeIcon className="title icon-speaker" icon={faBullhorn} />
                </div>

                {this.state.announcements.map((announcement) => (
                    <AnnouncementPost details={announcement} key={announcement._id} />
                ))}

            </div>
        )
    }
}
