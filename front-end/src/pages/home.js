import React from 'react'
import mcss from '../mcssLogo.svg';
import './home.css';
import Introduction from '../components/WhoWeAre/Introduction.js'
import LogoBar from '../components/logoBar/logoBar';
import EmailMailchimp from '../components/mailchimp/emailMailchimp.js';
import Announcements from '../components/announcements/announcement.js'
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents.js';
import Footer from '../components/footer/footer.js';
import PastEvents from '../components/pastEvent/uploadPastEvent';

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
        <div className="Home-AppContent">
          <Introduction />
          {
          this.state.success && <EmailMailchimp />
          }
          <Announcements />
          <UpcomingEvents />
        </div>
        <Footer />
      </div>
    );
  }
}