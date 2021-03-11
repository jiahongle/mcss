import React from 'react';
import './announcements.css';
import CreateAnnouncement from './createAnnouncement.js';
import AnnouncementPost from './announcementPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"

export default class announcement extends React.Component {
    composeRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            announcements: [
            ],
            loggedIn: false
        }

        this.forceRerender = this.forceRerender.bind(this);
    }

    componentDidMount() {
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ announcements: data.data })
            });
        
        requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        };
        fetch('http://localhost:5000/admins/protected', requestOptions).then(response => {
            if (response.status === 200) {

                this.setState({ loggedIn: true })
            } else {
                console.log("no cookie found")
            }
        });
    }

    openCreateDialog = () => {
        this.composeRef.current.openDialog();
    }

    forceRerender(i) {
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ announcements: data.data })
            });
        console.log(this.state.announcements);
        this.forceUpdate();
    }


    render() {
        return (
            <div className="announcement-container">
                <CreateAnnouncement ref={this.composeRef} />
                <div className="title-container">
                    <b>Announcements</b>
                    <FontAwesomeIcon className="title icon-speaker" icon={faBullhorn} />
                    {  
                        this.state.loggedIn && 
                            <div className="Create-Button" onClick={this.openCreateDialog}>
                                Create Announcement
                            </div>
                    }
                </div>

                {this.state.announcements.map((announcement) => (
                    <AnnouncementPost loggedIn={this.state.loggedIn} details={announcement} key={announcement._id} rerenderCallback={this.forceRerender}/>
                ))}
            </div>
        )
    }
}
