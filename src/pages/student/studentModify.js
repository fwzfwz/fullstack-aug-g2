import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';

const StudentModify = props => {
  const [name, setName] = useState('');
  const [motto, setMotto] = useState('');
  const [github, setGithub] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (props.user() === null) {
      history.replace('/student');
    } else {
      if (location.studentId !== 'add') {
        let student = props
          .students()
          .filter(s => s.id === location.studentId)[0];

        setName(student.name);
        setMotto(student.motto);
        setGithub(student.github);
        setImgUrl(student.imgUrl);
        setUsername(student.username);
        setPassword(student.password);
      }
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    let studentObj = {
      id: location.studentId !== 'add' ? location.studentId : username,
      name: name,
      motto: motto,
      github: github,
      imgUrl: imgUrl,
      username: username,
      password: password,
    };
    if (location.studentId !== 'add') {
      props.editStudent(location.studentId, studentObj);
    } else {
      props.addStudent(studentObj);
    }
  };

  return (
    <>
      <Container className="my-5 w-50">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Nama Student"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Motto</Form.Label>
            <Form.Control
              placeholder="Motto Student"
              value={motto}
              onChange={e => setMotto(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Github URL</Form.Label>
            <Form.Control
              placeholder="Github Student"
              value={github}
              onChange={e => setGithub(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              placeholder="Image Student"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Username Student"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password Student"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default StudentModify;
