import React, { useEffect } from 'react';
import ProtectedRoute from './routes';
import KaryawanList from './pages/karyawan/listKaryawan';
import ModifyKaryawan from './pages/karyawan/modifyKaryawan';
import DepartementList from './pages/departement/listDepartement';
import ModifyDepartement from './pages/departement/modifyDepartement';
import CV from './pages/cv';
import Login from './pages/login';
import { Route, Switch } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { setLogin, setLoginKaryawan } from './actions';

function App(props) {
  useEffect(() => {
    const loggedKaryawanStorage = JSON.parse(
      localStorage.getItem('loggedKaryawan')
    );
    const loggedUserStorage = JSON.parse(localStorage.getItem('loggedUser'));
    props.loginKaryawan(loggedKaryawanStorage);
    props.login(loggedUserStorage);
  }, []);

  const loggedUser = useSelector(state => state.loggedUser);
  useEffect(() => 
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser)), [loggedUser]);

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

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  loggedKaryawan: state.loggedKaryawan,
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(setLogin(payload)),
  loginKaryawan: payload => dispatch(setLoginKaryawan(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
