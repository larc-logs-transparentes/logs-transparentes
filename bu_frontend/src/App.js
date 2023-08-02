import React  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './common/scss/styles.scss';

export default function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
}
