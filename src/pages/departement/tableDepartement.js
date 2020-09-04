import React, { useEffect } from 'react';
import db from '../../firebase';
import Table from 'react-bootstrap/Table';
import { setDepartement } from '../../actions';
import { connect } from 'react-redux';

const TableDepartement = props => {
  useEffect(() => {
    props.setDepartement();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Departement Name</th>
        </tr>
      </thead>
      <tbody>
        {props.departements.map(departement => {
          return (
            <tr key={departement.id}>
              <th>{departement.id}</th>
              <th>{departement.name}</th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
const mapStateToProps = state => ({
  departements: state.departements,
});

const mapDispatchToProps = dispatch => ({
  setDepartement: () => dispatch(setDepartement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableDepartement);
