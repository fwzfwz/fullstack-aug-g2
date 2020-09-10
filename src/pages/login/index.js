import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogin } from '../../action/auth';
import db from '../../config/firebase';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(props.loggedUser).length > 1) {
      history.replace('/student');
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await db
      .collection('students')
      .where('username', '==', username)
      .where('password', '==', password)
      .get()
      .then(students => {
        if (!students.empty) {
          students.forEach(student => {
            props.login(student.data());
          });
          history.push('/student');
        } else {
          alert('User Not Found');
        }
      })
      .catch(error => console.error(`Error ${error}`));
  };

  return (
    <div className="w-25 mx-auto mt-5 pt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={el => setUsername(el.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
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
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(setLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
