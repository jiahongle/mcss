import React from 'react'
import mcss from '../mcssLogo.svg';
import './eventPage.css';
import Footer from '../components/footer/footer.js';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import ComposeEventDialog from '../components/composeEventDialog/composeEventDialog'



export default class EventPage extends React.Component {
    composeEvent = React.createRef();

    openDialog = () => {
        this.composeEvent.current.openDialog();
    }
    
    render() {
      return (
        <div>
            <ComposeEventDialog ref={this.composeEvent} isNew/>
            <div className="header">
                <img src={mcss} className="mcss-logo"/>
            </div>
            <div className="AppContent">
                <div className="title-container">
                    <div className="view-events"> View Upcoming Events </div>
                    <div className="new-event" onClick={this.openDialog}>
                        New Event
                    </div>
                </div>
          </div>
          <Footer />
        </div>
      );
    }
  }