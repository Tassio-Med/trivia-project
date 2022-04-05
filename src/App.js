import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
