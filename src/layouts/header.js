import React, { useEffect } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link
          to="/student"
          style={{ color: 'whitesmoke', textDecoration: 'none' }}
        >
          Student
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Form inline>
        {props.user() !== null ? <Button onClick={() => props.handleLogout()}>Log Out</Button> : null}
      </Form>
    </Navbar>
  );
};

export default Header;
