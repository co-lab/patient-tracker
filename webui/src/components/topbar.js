import React from 'react';
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
        <a style={{ color: '#fff' }} href="/">Patient Tracker</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav>
        <NavItem href="/#new-patient">New Patient</NavItem>
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
