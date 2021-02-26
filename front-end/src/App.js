import React from 'react';
import Home from './components/home.js';


import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>

    );
  }
}
