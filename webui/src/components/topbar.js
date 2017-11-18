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
  <Navbar inverse collapseOnSelect className="navbar-fixed-top" style={{
    background: '#204a87', borderRadius: 0,
  }}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link style={{ color: '#fff' }} to="/">Patient Tracker</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/new-patient">
          <NavItem>New Patient</NavItem>
        </LinkContainer>
      </Nav>

      <Nav pullRight className="hidden-xs">
        <NavItem href="http://co-lab.io" style={{
          backgroundImage: `url(${require('../imgs/logo/logo.svg')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 60%',
          backgroundPosition: '50%',
          overflow: 'hidden',
          height: 50,
          width: 130,
        }}>
          <div style={{ paddingTop: 50 }}>Masaryk Co-Lab</div>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
