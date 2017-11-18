import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopBar from './components/topbar';
import PatientList from './screens/PatientList';
import NewPatient from './screens/NewPatient';

export default (props) => (
  <Router {...props}>
    <div>
      <TopBar />

      <Route path="/" exact component={PatientList} />
      <Route path="/new-patient" component={NewPatient} />
    </div>
  </Router>
);
