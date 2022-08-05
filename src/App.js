import React from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Link to="/">Login</Link>
      <Switch>
        <Route exact path="/" render={ () => <Login /> } />
        <Route path="/settings" render={ () => <Settings /> } />
      </Switch>
    </div>

  );
}
