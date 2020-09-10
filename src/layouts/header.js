import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogout } from '../action/auth';

const Header = props => {
  const history = useHistory();

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
        {Object.keys(props.loggedUser).length > 1 ? (
          <Button
            onClick={() => {
              props.logout();
              history.replace('/');
            }}
          >
            Log Out
          </Button>
        ) : null}
      </Form>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
