import React , { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';

export default function App() {
  // useEffect(() => {
  //   pyodide.loadPackage('numpy').then(() => {
  //     console.log(pyodide.runPython(`import numpy as np np.cos(np.pi / 4)`));
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route component={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
}
