import React, { useState, useEffect } from 'react';
import db from '../firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { connect} from 'react-redux';
import { setLogin, setLoginKaryawan } from '../actions';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (props.loggedUser.nip !== null) {
      history.replace('/cv');
    }
  }, []);

  const checkExist = async () => {
    let isExist = false;
    await db
      .collection('users')
      .where('username', '==', username.toString())
      .where('password', '==', password.toString())
      .get()
      .then(users => (!users.empty ? (isExist = true) : (isExist = false)));
    return isExist;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (username && password) {
      let userData = {};
      let karyawanData = {};
      checkExist().then(async value => {
        if (value) {
          await db
            .collection('users')
            .where('username', '==', username.toString())
            .where('password', '==', password.toString())
            .get()
            .then(users =>
              users.forEach(user => {
                userData = user.data();
                props.login(userData);
                localStorage.setItem('loggedUser', JSON.stringify(userData));
              })
            );

          await db
            .collection('karyawans')
            .where('nip', '==', userData.nip)
            .get()
            .then(karyawans =>
              karyawans.forEach(karyawan => {
                karyawanData = karyawan.data();
                karyawanData.dateOfBirth = new Date(
                  karyawanData.dateOfBirth
                ).toDateString();
              })
            );

          await db
            .collection('departements')
            .doc(karyawanData.departement_id)
            .get()
            .then(departement => {
              karyawanData.departement_id = departement.data().name;
              props.loginKaryawan(karyawanData);
              localStorage.setItem(
                'loggedKaryawan',
                JSON.stringify(karyawanData)
              );
            });
          history.replace('/cv');
        } else {
          alert('No User');
        }
      });
    }
  };

  return (
    <div className="w-25 mx-auto mt-5 pt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="number"
            placeholder="Admin Username: 73897725 (Development Only)"
            name="username"
            onChange={el => setUsername(el.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Admin Password: 73897725 (Development only)"
            name="password"
            onChange={el => setPassword(el.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  loggedKaryawan: state.loggedKaryawan,
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(setLogin(payload)),
  loginKaryawan: payload => dispatch(setLoginKaryawan(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);