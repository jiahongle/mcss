import React from 'react';
import mcss from './mcssLogo.svg';
import './App.css';
import Introduction from './components/WhoWeAre/Introduction.js'
import LogoBar from './components/logoBar/logoBar';
import Announcements from './components/announcements/announcement.js'
import CreateAnnouncement from './components/announcements/createAnnouncement.js';
import DeleteAnnouncement from './components/announcements/deleteAnnouncement.js'
import EditAnnouncement from './components/announcements/editAnnouncement.js'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { GoThreeBars } from 'react-icons/go';
import Navbar from './components/navBar/navBar.js'
import Home from './pages/home'
import Team from './pages/theTeam'

export default class App extends React.Component {
  menu = React.createRef()

  render() {
    return (
      <div className="App">
        <Router>
          <div className="menu-button-area">
              <Link to="#" className="menu-button">
                <GoThreeBars onClick={() => {this.menu.current.toggleMenuActive()}}/>
              </Link>
          </div>
            <Navbar ref={this.menu}/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/team' component={Team}/>
            </Switch>
        </Router>
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
