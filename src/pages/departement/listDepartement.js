import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TableKaryawan from './tableDepartement';
import Header from '../../layouts/header';
import { Link, useHistory } from 'react-router-dom';

const ListDepartement = () => {
  const history = useHistory();

  useEffect(() => {
    if (
      JSON.parse(localStorage.loggedKaryawan).departement_id !== 'HR Departement'
    ) {
      history.replace('/cv');
    }
  }, []);
  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="my-3">
          <Col md={4}>
            <Button>
              <Link
                to="/departement/add"
                style={{ color: 'whitesmoke', textDecoration: 'none' }}
              >
                + Departement
              </Link>
            </Button>
          </Col>
        </Row>
        <TableKaryawan />
      </Container>
    </>
  );
};

export default ListDepartement;
