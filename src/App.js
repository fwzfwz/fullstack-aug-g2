import React from 'react';
import Header from './layouts/header';
import Login from './pages/login';
import StudentList from './pages/student/studentList';
import StudentModify from './pages/student/studentModify';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/student">
          <StudentList />
        </Route>
        <Route path="/student/:studentId">
          <StudentModify />
        </Route>
        <Route path="*" component={() => 'NO ROUTE'} />
      </Switch>
    </div>
  );
}

export default App;
