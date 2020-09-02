import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../../layouts/header';

const DetailDepartement = () => {
  const [karyawanState, setKaryawan] = useState({});
  const [departement, setDepartement] = useState('Loading...');

  useEffect(() => {
    const getKaryawan = async () => {
      await db
        .collection('karyawans')
        .where('nip', '==', parseInt(JSON.parse(localStorage.loggedUser).nip))
        .get()
        .then(karyawans =>
          karyawans.forEach(karyawan => {
            setKaryawan(karyawan.data());
            db.collection('departements')
              .doc(karyawan.data().departement_id)
              .get()
              .then(departement => setDepartement(departement.data().name));
          })
        );
    };
    getKaryawan();
  }, []);

  return (
    <>
      <Header />
      <Container className="m-5 p-5">
        <Row className="my-3">
          <Col lg={3}>
            <h5>NIP</h5>
          </Col>
          <Col>
            <h5>{karyawanState.nip}</h5>
          </Col>
        </Row>
        <Row className="my-3">
          <Col lg={3}>
            <h5>Name</h5>
          </Col>
          <Col>
            <h5>{karyawanState.name}</h5>
          </Col>
        </Row>
        <Row className="my-3">
          <Col lg={3}>
            <h5>Departement</h5>
          </Col>
          <Col>
            <h5>{departement}</h5>
          </Col>
        </Row>
        <Row className="my-3">
          <Col lg={3}>
            <h5>Date of Birth</h5>
          </Col>
          <Col>
            <h5>{new Date(karyawanState.dateOfBirth).toDateString()}</h5>
          </Col>
        </Row>
        <Row className="my-3">
          <Col lg={3}>
            <h5>Motto</h5>
          </Col>
          <Col>
            <h5>{karyawanState.motto}</h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailDepartement;
