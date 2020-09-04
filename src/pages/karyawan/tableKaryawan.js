import React, { useEffect } from 'react';
import db from '../../firebase';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { setKaryawan } from '../../actions';
import { connect } from 'react-redux';

const TableKaryawan = props => {
  useEffect(() => {
    props.setKaryawan();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>NIP</th>
          <th>Name</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {props.karyawans.map(karyawan => {
          console.log('adasdad', karyawan);
          return (
            <tr key={karyawan.id}>
              <th>{karyawan.nip}</th>
              <th>{karyawan.name}</th>
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

const mapStateToProps = state => ({
  karyawans: state.karyawans,
});
const mapDispatchToProps = dispatch => ({
  setKaryawan: () => dispatch(setKaryawan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableKaryawan);
