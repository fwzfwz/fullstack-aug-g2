import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TableKaryawan from './tableKaryawan';
import Header from '../../layouts/header';
import { Link, useHistory } from 'react-router-dom';

const ListKaryawan = () => {
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
                to="/karyawan/add"
                style={{ color: 'whitesmoke', textDecoration: 'none' }}
              >
                + Karyawan
              </Link>
            </Button>
          </Col>
        </Row>
        <TableKaryawan />
      </Container>
    </>
  );
};

export default ListKaryawan;
