import React from 'react';
import { Navbar, Nav, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = props => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/cv" style={{ color: 'whitesmoke', textDecoration: 'none' }}>
          HR Management
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        {JSON.parse(localStorage.loggedKaryawan).departement_id !==
        'HR Departement' ? null : (
          <>
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
          </>
        )}
      </Nav>
      <Form inline>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {JSON.parse(localStorage.getItem('loggedKaryawan')).name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </Navbar>
  );
};

export default Header;
