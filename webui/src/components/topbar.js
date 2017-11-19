import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

export default () => (
  <Navbar inverse collapseOnSelect fixedTop style={{
    background: '#204a87', borderRadius: 0,
  }}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/" style={{
          backgroundImage: `url(${require('../imgs/logo/logo.svg')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 60%',
          backgroundPosition: '10px 50%',
          overflow: 'hidden',
          padding: 13,
        }}>
          <div style={{ paddingLeft: 40, color: '#fff' }}>mpt</div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/" exact>
          <NavItem>All Patients</NavItem>
        </LinkContainer>
        <LinkContainer to="/new-patient">
          <NavItem>New Patient</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem>Logout</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
