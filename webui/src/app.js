import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import TopBar from './components/TopBar';
import PatientList from './pages/PatientList';
import NewPatient from './pages/NewPatient';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';

import { isLoggedIn } from './lib/auth';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={PatientList} />
    <Route path="/new-patient" component={NewPatient} />
    <Route component={NotFound} />
  </Switch>
);

export default (props) => (
  <Router {...props}>
    <div>
      <TopBar />
      { isLoggedIn() ? <Routes /> : <Route component={SignIn} /> }
    </div>
  </Router>
);
