import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect, useHistory, Link } from 'react-router-dom';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (props.user() !== null) {
      history.replace('/student');
    }
  }, [props.user()]);

  const handleSubmit = e => {
    e.preventDefault();
    props.handleLogin(username, password);
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

export default Login;
