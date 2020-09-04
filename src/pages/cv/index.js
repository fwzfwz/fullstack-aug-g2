import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../../layouts/header';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DetailDepartement = props => {
  const [karyawanState, setKaryawan] = useState({});
  const [departement, setDepartement] = useState('Loading...');
  const history = useHistory();

  useEffect(() => {
    if (props.loggedUser.nip === null) {
      history.replace('/');
    }
    const getKaryawan = async () => {
      await db
        .collection('karyawans')
        .where('nip', '==', parseInt(props.loggedUser.nip))
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

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  loggedKaryawan: state.loggedKaryawan,
});

export default connect(mapStateToProps)(DetailDepartement);
