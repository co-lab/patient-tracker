import React from 'react';
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

const capitalize = (s) => s.replace(/\b./g, (m) => m.toUpperCase());

export default ({ id, label, placeholder }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} sm={3}>
      {label || capitalize(id)}
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder={placeholder || capitalize(id)} />
    </Col>
  </FormGroup>
);
