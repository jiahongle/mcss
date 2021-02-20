import React from 'react';
import './App.css';
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
      </div>
    );
  }
}
