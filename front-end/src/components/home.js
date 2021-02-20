import React from 'react';
import mcss from '../mcssLogo.svg';
import '../App.css';
import Introduction from './WhoWeAre/Introduction.js'
import LogoBar from './logoBar/logoBar';
import Announcements from './announcements/announcement.js'
import CreateAnnouncement from './announcements/createAnnouncement.js';
import DeleteAnnouncement from './announcements/deleteAnnouncement.js';
import EditAnnouncement from './announcements/editAnnouncement.js';


export default class Home extends React.Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="logo-header">
                        <img src={mcss} className="App-logo" alt="logo" />
                    </div>
                    <LogoBar />
                </header>
                <div className="AppContent">
                    <Introduction />
                    <Announcements />
                    <CreateAnnouncement />
                    <DeleteAnnouncement />
                    <EditAnnouncement />
                </div>
            </div>

        );
    }
}