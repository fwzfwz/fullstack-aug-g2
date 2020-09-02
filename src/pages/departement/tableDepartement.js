import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import Table from 'react-bootstrap/Table';

const TableDepartement = () => {
  const [departementsState, setDepartements] = useState([]);

  useEffect(() => {
    const populateDepartements = async () => {
      await db
        .collection('departements')
        .get()
        .then(departements =>
          departements.forEach(departement => {
            let dept = {};
            dept.id = departement.id;
            dept.name = departement.data().name;
            setDepartements(oldDept => [...oldDept, dept]);
          })
        );
    };
    populateDepartements();
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
        {departementsState.map(departement => {
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

export default TableDepartement;
