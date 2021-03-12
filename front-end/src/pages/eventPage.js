import React from 'react'
import mcss from '../mcssLogo.svg';
import './eventPage.css';
import Footer from '../components/footer/footer.js';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import ComposeEventDialog from '../components/composeEventDialog/composeEventDialog'



export default class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        success: true, // Logged in status
    }   
  }
  editEvent = React.createRef()
  newEvent = React.createRef()

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

  
  openNewEventDialog = () => {
    this.newEvent.current.openDialog();
  }

  openEditEventDialog = (event) => {
    this.editEvent.current.openDialog();
    this.editEvent.current.setState(event);
  }

  render() {
    return (
      <div>
        <ComposeEventDialog ref={this.editEvent} />
        <ComposeEventDialog ref={this.newEvent} isNew/>
        <div className="header">
          <img src={mcss} className="mcss-logo" />
        </div>
        <div className="AppContent">
          <div className="title-container">
            <div className="view-events"> View Upcoming Events </div>
            {this.state.success &&
              <div className="new-event" onClick={this.openNewEventDialog}>
                New Event
              </div>
            }
          </div>
          {this.state.success &&
              <div className="new-event" onClick={() => this.openEditEventDialog(this.fakeEventData)}>
                Edit Event
              </div>
            }
        </div>
        <Footer />
      </div>
    );
  }
}