import React from 'react'
import mcss from '../mcssLogo.svg';
import './home.css';
import Introduction from '../components/WhoWeAre/Introduction.js'
import LogoBar from '../components/logoBar/logoBar';
import Announcements from '../components/announcements/announcement.js'
import CreateAnnouncement from '../components/announcements/createAnnouncement.js';
import DeleteAnnouncement from '../components/announcements/deleteAnnouncement.js'
import EditAnnouncement from '../components/announcements/editAnnouncement.js'
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents.js';
import Footer from '../components/footer/footer.js';

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
          <UpcomingEvents />
        </div>
        <Footer />
      </div>

    );
  }
}