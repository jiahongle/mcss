import React from 'react'
import mcss from '../mcssLogo.svg';
import './eventPage.css';
import Footer from '../components/footer/footer.js';
import UploadPastEvent from '../components/pastEvent/uploadPastEvent';
import PastEventSection from '../components/pastEvent/pastEventsSection/pastEventsSection';
import UpcomingEventsEP from '../components/UpcomingEvents/UpcomingEventsEP'


export default class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        success: true, // Logged in status
    }   
  }
  editEvent = React.createRef()

  // Stub for event data structure
  fakeEventData = {
    mainEventTitle: "Hackathon",
    mainEventTime:"Mar 20, 2050 @ 6:00 PM",
    mainEventDescription: "Blah Blah",
    mainEventImages: [],
    mainEventSignupLink:"www.scam.com/getScammed",
    subEvents: [{ title: "Workshop 1", time: "Mar 20, 2050 @ 4:00 PM", description: "Ha Ha", signupLink: "www.phishing.com" }]
  }

  // Check if logged in as admin, if yes, show editing UI.
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

  openEditEventDialog = (event) => {
    this.editEvent.current.openDialog();
    this.editEvent.current.setState(event);
  }

  render() {
    return (
      <div>
        <div className="header">
          <img src={mcss} className="mcss-logo" />
        </div>
        <div className="AppContent">
          <UpcomingEventsEP/>
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