import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const TableKaryawan = () => {
  const [karyawansState, setKaryawans] = useState([]);

  useEffect(() => {
    const populateKaryawan = async () => {
      await db
        .collection('karyawans')
        .get()
        .then(karyawans => {
          karyawans.forEach(async karyawan => {
            let kar = karyawan.data();
            kar.id = karyawan.id;
            await db
              .collection('departements')
              .doc(kar.departement_id)
              .get()
              .then(
                departement => (kar.departement_name = departement.data().name)
              );
            setKaryawans(oldKaryawans => [...oldKaryawans, kar]);
          });
        });
    };
    populateKaryawan();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>NIP</th>
          <th>Name</th>
          <th>Departement</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {karyawansState.map(karyawan => {
          return (
            <tr key={karyawan.id}>
              <th>{karyawan.nip}</th>
              <th>{karyawan.name}</th>
              <th>{karyawan.departement_name}</th>
              <th>
                <Button>
                  <Link
                    to={'/karyawan/' + karyawan.nip}
                    style={{ color: 'whitesmoke', textDecoration: 'none' }}
                  >
                    Details
                  </Link>
                </Button>
              </th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableKaryawan;
