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
import UploadPastEvent from '../components/pastEvent/uploadPastEvent';
import PastEventSection from '../components/pastEvent/pastEventsSection/pastEventsSection';
import Footer from '../components/footer/footer.js';

export default class Home extends React.Component {
  state = {
    success: false
  }


  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      credentials: 'include'
    };
    fetch('http://localhost:5000/admins/protected', requestOptions).then(response => {

      if (response.status === 200) {

        this.setState({ success: true })
      } else {
        console.log("no cookie found")
      }
    });
  }
  render() {
    return (
      <div>
        <header className="App-header">
          <div className="logo-header">
            <img src={mcss} className="App-logo" alt="logo" />
          </div>
          <LogoBar />
        </header>
        <div className="AppContent">
          <Introduction />
          <Announcements />
          <UpcomingEvents />
          {this.state.success &&
            <div>
              <CreateAnnouncement />
              <DeleteAnnouncement />
              <EditAnnouncement />

            </div>
          }
          <PastEventSection />
          {this.state.success &&
            <div>
              <UploadPastEvent />
            </div>
          }
        </div>
        <Footer />
      </div>
    );
  }
}