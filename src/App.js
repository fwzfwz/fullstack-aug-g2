import React from 'react';
import ProtectedRoute from './routes';
import KaryawanList from './pages/karyawan/listKaryawan';
import ModifyKaryawan from './pages/karyawan/modifyKaryawan';
import DepartementList from './pages/departement/listDepartement';
import ModifyDepartement from './pages/departement/modifyDepartement';
import CV from './pages/cv';
import Login from './pages/login';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/cv" component={CV} />
        <ProtectedRoute exact path="/karyawan" component={KaryawanList} />
        <ProtectedRoute
          exact
          path="/karyawan/:nip"
          component={ModifyKaryawan}
        />
        <ProtectedRoute exact path="/departement" component={DepartementList} />
        <ProtectedRoute
          exact
          path="/departement/:id"
          component={ModifyDepartement}
        />
        <Route path="*" component={() => 'NO ROUTE'} />
      </Switch>
    </div>
  );
}

export default App;
