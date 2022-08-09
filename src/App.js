import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feed from './pages/Feed';

export default function App() {
  return (
    <div>
      <Link to="/">Login</Link>
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route path="/settings" render={ () => <Settings /> } />
        <Route patch="/game" render={ () => <Game /> } />
        <Route patch="/feed" render={ () => <Feed /> } />
      </Switch>
    </div>
  );
}
