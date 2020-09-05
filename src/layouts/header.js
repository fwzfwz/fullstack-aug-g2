import React, { useEffect } from 'react';
import { Navbar, Nav, Form, Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogout, setLogoutKaryawan } from '../actions';

const Header = props => {
  const history = useHistory();

  useEffect(() => {
    if (props.loggedUser.nip === null) {
      history.replace('/');
    }
  }, []);

  const handleLogout = () => {
    props.logout();
    props.logoutKaryawan();
    localStorage.setItem('loggedUser', null);
    localStorage.setItem('loggedKaryawan', null);
    history.replace('/');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/cv" style={{ color: 'whitesmoke', textDecoration: 'none' }}>
          HR Management
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <Link
            to="/karyawan"
            style={{ color: 'whitesmoke', textDecoration: 'none' }}
          >
            Karyawan
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link
            to="/departement"
            style={{ color: 'whitesmoke', textDecoration: 'none' }}
          >
            Departement
          </Link>
        </Nav.Link>
      </Nav>
      <Form inline>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {props.loggedKaryawan.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  loggedKaryawan: state.loggedKaryawan,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setLogout()),
  logoutKaryawan: () => dispatch(setLogoutKaryawan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
