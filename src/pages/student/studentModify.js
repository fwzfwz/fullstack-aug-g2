import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import db from '../../config/firebase';
import { connect } from 'react-redux';

const StudentModify = props => {
  const [name, setName] = useState('');
  const [motto, setMotto] = useState('');
  const [github_url, setGithub] = useState('');
  const [img_url, setImgUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { studentId } = useParams();

  useEffect(() => {
    if (studentId !== 'add') {
      db.collection('students')
        .doc(studentId)
        .get()
        .then(s => s.data())
        .then(student => {
          setName(student.name);
          setMotto(student.motto);
          setGithub(student.github_url);
          setImgUrl(student.img_url);
          setUsername(student.username);
          setPassword(student.password);
        });
    }
  }, [studentId]);

  const handleSubmit = e => {
    e.preventDefault();
    let studentObj = { name, motto, github_url, img_url, username, password };
    if (studentId !== 'add') {
      db.collection('students')
        .doc(studentId)
        .set(studentObj)
        .then(() => console.log(`Student ${studentId} Updated`))
        .catch(error => console.error(`Error ${error}`));
    } else {
      db.collection('students')
        .add(studentObj)
        .then(student => console.log(`Student ${student.id} Created`))
        .catch(error => console.error(`Error ${error}`));
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
              value={github_url}
              onChange={e => setGithub(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              placeholder="Image Student"
              value={img_url}
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

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
});

export default connect(mapStateToProps)(StudentModify);
