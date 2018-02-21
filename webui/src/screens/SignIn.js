import React from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  ControlLabel,
  Checkbox,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

import TextField from '../components/TextField';

export default () => (
  <Grid style={{ paddingTop: 40 }}>
    <Row>
      <Col md={12}><h2>Sign-in</h2></Col>
    </Row>
    <Form horizontal>
      <Col md={8}>
        <TextField
          id="email"
          label="Email Address"
          placeholder="you@youremail.domain" />
        <hr />
        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button bsStyle="primary" type="submit">
              Sign In
            </Button>
          </Col>
        </FormGroup>
      </Col>
    </Form>
  </Grid>
);
