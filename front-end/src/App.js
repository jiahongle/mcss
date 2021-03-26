import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { GoThreeBars } from 'react-icons/go';
import Navbar from './components/navBar/navBar.js'
import Home from './pages/home'
import Events from './pages/eventPage'
import Team from './pages/theTeam/theTeam.js'
import Announcements from './pages/announcements';
import PartnerClubs from './pages/partnerClubs/partnerClubs.js';
import Login from './pages/login';
import EventDetailPage from './pages/eventDetailPage.js'

export default class App extends React.Component {
  menu = React.createRef()

  render() {
    return (
      <div className="App">
        <Router>
          <div className="menu-button-area">
            <Link to="#" className="menu-button">
              <GoThreeBars onClick={() => { this.menu.current.toggleMenuActive() }} />
            </Link>
          </div>
          <Navbar ref={this.menu} />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/team' component={Team} />
            <Route path='/announcements' component={Announcements} />
            <Route path='/events' component={Events} />
            <Route path='/partnerClubs' component={PartnerClubs} />
            <Route path='/login' component={Login} />
            <Route path='/eventdetail/:id' component={EventDetailPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
