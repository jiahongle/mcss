import React from 'react';
import './announcements.css';
import CreateAnnouncement from './createAnnouncement.js';
import AnnouncementPost from './announcementPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"
import { FaChevronDown } from 'react-icons/fa'

export default class announcement extends React.Component {
    composeRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            announcements: [
            ],
            loggedIn: false,
            isCollapsed: false
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
                this.setState({ announcements: data.data.reverse()})
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

    forceRerender = () => {
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
        };
        fetch('http://localhost:5000/announcements/get', requestOptions)
            .then((response) =>
                response.json()
            ).then(data => {
                this.setState({ announcements: data.data.reverse() })
                console.log(data)
                console.log(this.state.announcements);
            });
    }

    /* Toggles the state of the event between Collapsed and Expanded */
    toggleCollapse = () => {
        this.setState({
                isCollapsed: !this.state.isCollapsed
        })
    }


    render() {
        return (
            <div className="announcement-container">
                <CreateAnnouncement ref={this.composeRef} rerenderCallback={this.forceRerender}/>
                <div className="title-container">
                    <b>Announcements</b>
                    <FontAwesomeIcon className="title icon-speaker" icon={faBullhorn} />
                    {this.state.isCollapsed? 
                        <FaChevronDown className="Chevron chevron-right clickable"
                            onClick={this.toggleCollapse} />
                        :
                        <FaChevronDown className="Chevron chevron-down clickable"
                            onClick={this.toggleCollapse} />
                    }
                    {  
                        this.state.loggedIn && 
                            <div className="Create-Button" onClick={this.openCreateDialog}>
                                Create Announcement
                            </div>
                    }
                </div>

                {this.state.announcements.map((announcement, i) => (
                    <AnnouncementPost loggedIn={this.state.loggedIn} 
                                      details={announcement} key={i} 
                                      rerenderCallback={this.forceRerender}
                                      isCollapsed={this.state.isCollapsed}/>
                ))}
            </div>
        )
    }
}
