import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import TopBar from './components/topbar';
import PatientList from './screens/PatientList';
import NewPatient from './screens/NewPatient';
import NotFound from './screens/NotFound';
import SignIn from './screens/SignIn';

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
