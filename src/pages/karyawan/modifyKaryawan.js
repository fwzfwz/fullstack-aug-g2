import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../../layouts/header';
import { useParams, useHistory } from 'react-router-dom';

const ModifyKaryawan = props => {
  let { nip } = useParams();
  let history = useHistory();
  const [nipState, setNip] = useState('');
  const [nameState, setName] = useState('');
  const [dobState, setDob] = useState('');
  const [deptState, setDept] = useState('');
  const [mottoState, setMotto] = useState('');
  const [depts, setDepts] = useState([]);

  const addKaryawan = e => {
    e.preventDefault();

    let karyawanObj = {
      nip: parseInt(nipState),
      name: nameState.toString(),
      dateOfBirth: parseInt(new Date(dobState.toString()).getTime()),
      departement_id: deptState.toString(),
      motto: mottoState.toString(),
    };
    if (nip === 'add') {
      db.collection('karyawans')
        .add(karyawanObj)
        .then(ref => console.log(ref))
        .catch(err => console.log('An Error Occured', err));

      db.collection('users')
        .add({
          nip: parseInt(nipState),
          username: nipState.toString(),
          password: nipState.toString(),
        })
        .then(ref => console.log(ref))
        .catch(err => console.log('An Error Occured', err));
    } else {
      db.collection('karyawans')
        .where('nip', '==', parseInt(nip))
        .get()
        .then(karyawans => {
          karyawans.forEach(karyawan => {
            db.collection('karyawans').doc(karyawan.id).set(karyawanObj);
          });
        });
    }
  };

  const populateDepartements = async () => {
    await db
      .collection('departements')
      .get()
      .then(departements => {
        departements.forEach(departement => {
          const dept = { id: departement.id, name: departement.data().name };
          setDepts(oldDepts => [...oldDepts, dept]);
        });
      });
  };

  const getKaryawan = async () => {
    await db
      .collection('karyawans')
      .where('nip', '==', parseInt(nip))
      .get()
      .then(karyawans => {
        karyawans.forEach(karyawan => {
          setName(karyawan.data().name);
          setDob(
            new Date(parseInt(karyawan.data().dateOfBirth))
              .toISOString()
              .split('T')[0]
          );
          setDept(karyawan.data().departement_id);
          setMotto(karyawan.data().motto);
        });
      });
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.loggedKaryawan).departement_id !== 'HR Departement'
    )
      history.replace('/cv');

    populateDepartements();
    if (nip && nip !== 'add') {
      setNip(nip);
      getKaryawan();
    } else {
      setNip(parseInt(Math.floor(Math.random() * 100000000)));
    }
  }, []);

  return (
    <>
      <Header />
      <Container className="my-5">
        <Form onSubmit={addKaryawan}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>NIP</Form.Label>
              <Form.Control type="text" value={nipState} disabled />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Nama Karyawan"
              value={nameState}
              onChange={el => setName(el.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={dobState}
                onChange={el => setDob(el.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>Departement</Form.Label>
              <Form.Control
                as="select"
                onChange={el => setDept(el.target.value)}
                value={deptState}
              >
                {depts.map(dept => {
                  return <option value={dept.id}>{dept.name}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Motto</Form.Label>
              <Form.Control
                type="text"
                value={mottoState}
                onChange={el => setMotto(el.target.value)}
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

export default ModifyKaryawan;
