import React from 'react';
import mcss from './mcssLogo.svg';
import './App.css';
import Introduction from './components/WhoWeAre/Introduction.js'
import LogoBar from './components/logoBar/logoBar';
import Announcements from './components/announcements/announcement.js'
import CreateAnnouncement from './components/announcements/createAnnouncement.js';
import DeleteAnnouncement from './components/announcements/deleteAnnouncement.js'
import EditAnnouncement from './components/announcements/editAnnouncement.js'


export default class App extends React.Component {


  // fetch('http://localhost:5000/announcements/get')
  //     .then((response) => {
  //       response.json()

  //     })
  //     .then(announcementsList => {
  //       // this.setState({ announcements: announcementsList });
  //       console.log(announcementsList)
  //     });

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
