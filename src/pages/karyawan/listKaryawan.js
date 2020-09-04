import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TableKaryawan from './tableKaryawan';
import Header from '../../layouts/header';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const ListKaryawan = props => {
  const history = useHistory();

  useEffect(() => {
    if (props.loggedKaryawan.departement_id !== 'HR Departement') {
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

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  loggedKaryawan: state.loggedKaryawan,
});

export default connect(mapStateToProps)(ListKaryawan);
