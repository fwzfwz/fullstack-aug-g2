import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../../layouts/header';
import {useHistory } from 'react-router-dom';

const ModifyDepartement = () => {
  const [departementName, setDepartementName] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (
      JSON.parse(localStorage.loggedKaryawan).departement_id !== 'HR Departement'
    ) {
      history.replace('/cv');
    }
  }, []);

  const addDepartement = e => {
    e.preventDefault();
    db.collection('departements')
      .add({ name: departementName })
      .then(ref => console.log('Success ref: ', ref))
      .catch(err => console.log('Error: ', err));
    history.replace('/departement');
  };

  return (
    <>
      <Header />
      <Container className="my-5 w-50">
        <Form onSubmit={addDepartement}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Departement Name</Form.Label>
              <Form.Control
                type="text"
                value={departementName}
                onChange={el => setDepartementName(el.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ModifyDepartement;
