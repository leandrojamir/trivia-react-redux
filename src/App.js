import React from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div>
      <Link to="/">Login</Link>
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route path="/settings" render={ () => <Settings /> } />
        <Route patch="/game" render={ () => <Game /> } />
        <Route patch="/feedback" render={ () => <Feedback /> } />
      </Switch>
    </div>

  );
}
