// Set up your application entry point here...
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "./styles/styles.scss";
import Board from './Board';

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/games/:userId" component={ Board } />
          <div>Steve Mu 2017</div>
        </Switch>
      </Router>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
