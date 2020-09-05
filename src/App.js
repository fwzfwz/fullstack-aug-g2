import React, { useState, useEffect } from 'react';
import Header from './layouts/header';
import Login from './pages/login';
import StudentList from './pages/student/studentList';
import StudentModify from './pages/student/studentModify';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

function App() {
  const [students, setStudents] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const history = useHistory();
  const initStudents = JSON.parse(
    '[{"id":"admin","name":"Admin","motto":"Motto Admin","github":"https://github.com/","imgUrl":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","username":"admin","password":"admin"},{"id":"ahmad","name":"Ahmad Nabil","motto":"Seharusnya kamu belajar berjalan dulu, nak! Barulah kamu bisa berlari.","github":"https://github.com/nbl77","imgUrl":"https://i.ibb.co/yFkZY5y/photoku.jpg","username":"ahmad","password":"ahmad"},{"id":"aisah","name":"Aisah Taufik Hidayat Abdullah","motto":"Do good and good will come to you","github":"https://github.com/athaisyah","imgUrl":"https://avatars0.githubusercontent.com/u/57663851?s=460&u=7bd2cabb95e920ea9cc3bea599b9f9baff618e9f&v=4","username":"aisah","password":"aisah"},{"id":"fauzan","name":"Fauzan Muhtadi","motto":"Today must better than yesterday","github":"https://github.com/fauzanmuhtadi","imgUrl":"https://i.ibb.co/JnZrPVP/Whats-App-Image-2020-03-23-at-09-15-17.jpg","username":"fauzan","password":"fauzan"},{"id":"fwz","name":"Fawwaazrahman Arandhana W","motto":"Beraki-rakit dahulu berakit-rakit kemudian, bersakit-sakit dahulu bersakit-sakit kemudian.","github":"https://github.com/fwzfwz","imgUrl":"https://bc3-production-assets-cdn.basecamp-static.com/3969846/people/30316027/avatars/avatar-0114179c9e592fa2088f97feceec41e6-128-x1","username":"fwz","password":"fwz"},{"id":"jason","name":"Jason Rich Darmawan Onggo Putra","motto":"1. Focus on testing the MVP, everything else can wait.  2. Learn from the mistakes.","github":"https://github.com/kidfrom","imgUrl":"https://media-exp1.licdn.com/dms/image/C5103AQEHNSw5h-XKyQ/profile-displayphoto-shrink_400_400/0?e=1604534400&v=beta&t=q3mdmY5CS8fDIiY3eofXj1bAfJfpHROXfy_j_qAIqwo","username":"jason","password":"jason"},{"id":"jenedy","name":"Jenedy Hidayat","motto":"Motto Jenedy Hidayat","github":"https://github.com/comindo","imgUrl":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","username":"jenedy","password":"jenedy"},{"id":"fadhil","name":"M Nurul Fadhil","motto":"Motto M Nurul Fadhil","github":"https://github.com/","imgUrl":"https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png","username":"fadhil","password":"fadhil"},{"id":"rifqi","name":"Rifqi Fakhirin","motto":"Being good is about how to combine consistency and integrity","github":"https://github.com/rifqifakhirin","imgUrl":"https://media-exp1.licdn.com/dms/image/C5103AQEjYXhFOKvyvg/profile-displayphoto-shrink_100_100/0?e=1599091200&v=beta&t=e7cIbyA6jPBM8nLwgTd_nmQfR7ltDd9DNsPFkBq_1Y8","username":"rifqi","password":"rifqi"},{"id":"ryan","name":"Ryan Suryohadiprojo S","motto":"ASK! Attitude, Skill and Knowledge","github":"https://github.com/RYANSUTODIWIRYO","imgUrl":"https://i.ibb.co/kQMJF86/DSC-7410.jpg","username":"ryan","password":"ryan"},{"id":"taufik","name":"Taufik Muharrom","motto":"Your future is created by what you to do today, not tommorow","github":"https://github.com/taufik-muharrom","imgUrl":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","username":"taufik","password":"taufik"},{"id":"yusal","name":"Yusal Sumardi","motto":"Aku Lebih Memilih Untuk Merobek Otakku, Membawanya Ke Perempatan Terdekat, Dan Bermain Lompat Tali Dengannya Dari Pada Harus Jadi Tetangga Kalian","github":"https://github.com/yusalsumardi","imgUrl":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","username":"yusal","password":"yusal"}]'
  );

  useEffect(() => {
    const studentStorage = JSON.parse(localStorage.getItem('students'));
    const loggedUserStorage = JSON.parse(localStorage.getItem('loggedUser'));
    const students = studentStorage !== null ? studentStorage : initStudents;
    const user = loggedUserStorage !== 'null' ? loggedUserStorage : null;
    setStudents(students);
    setLoggedUser(user);
  }, []);

  useEffect(() => {
    if (students.toString() !== '') {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  useEffect(() => {
    if (loggedUser !== null) {
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
  }, [loggedUser]);

  const getLoggedUser = () => {
    return loggedUser;
  };

  const getStudents = () => {
    return students;
  };

  const handleLogin = (username, password) => {
    let user = students.filter(
      student => student.username === username && student.password === password
    )[0];
    if (user !== undefined) {
      setLoggedUser(user);
      history.push('/student');
    } else {
      alert('No User');
    }
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.setItem('loggedUser', null);
    history.push('/');
  };

  const addStudent = studentObj => setStudents([...students, studentObj]);

  const editStudent = (id, studentObj) =>
    setStudents(
      students.map(student => (student.id === id ? studentObj : student))
    );

  const deleteStudent = studentId =>
    setStudents(students.filter(student => student.id !== studentId));

  return (
    <div className="App">
      <Header handleLogout={handleLogout} user={getLoggedUser} />
      <Switch>
        <Route exact path="/">
          <Login handleLogin={handleLogin} user={getLoggedUser} />
        </Route>
        <Route exact path="/student">
          <StudentList
            students={getStudents}
            deleteStudent={deleteStudent}
            user={getLoggedUser}
          />
        </Route>
        <Route path="/student/:studentId">
          <StudentModify
            students={getStudents}
            user={getLoggedUser}
            addStudent={addStudent}
            editStudent={editStudent}
          />
        </Route>
        <Route path="*" component={() => 'NO ROUTE'} />
      </Switch>
    </div>
  );
}

export default App;
