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

const capitalize = (s) => s.replace(/\b./g, (m) => m.toUpperCase());

const TextField = ({ id, label, placeholder }) => (
  <FormGroup controlId={id}>
    <Col componentClass={ControlLabel} sm={3}>
      {label || capitalize(id)}
    </Col>
    <Col sm={9}>
      <FormControl type="text" placeholder={placeholder || capitalize(id)} />
    </Col>
  </FormGroup>
);

const CheckboxField = ({ id, label }) => (
  <FormGroup controlId={id}>
    <Col smOffset={3} sm={9}>
      <Checkbox>{label}</Checkbox>
    </Col>
  </FormGroup>);

export default () => (
  <Grid>
    <Row>
      <Col md={12}><h2>New Patient</h2></Col>
    </Row>
    <Form horizontal>
      <Col md={6}>
        <h3>Patient Information</h3>
        <TextField
          id="patientName"
          label="Name"
          placeholder="Patient's Name" />
        <CheckboxField
          id="patientIsAware"
          label="Patient is aware of this referral" />
        <TextField id="language" />
        <TextField
          id="patientPhone"
          label="Phone"
          placeholder="Patient's Phone Number" />
        <TextField
          id="patientAddress"
          label="Address"
          placeholder="Patient's Address" />
        <TextField
          id="patientCity"
          label="City"
          placeholder="Patient's City" />
        <TextField
          id="patientState"
          label="State"
          placeholder="Patient's State" />
        <TextField
          id="organization"
          placeholder="Organization Name" />

        <h3>Family Support</h3>
        <TextField
          id="familySupportName"
          label="Name"
          placeholder="Name of the Relative" />
        <TextField
          id="familySupportPhone"
          label="Phone"
          placeholder="Phone Number of the relative" />

        <hr />
        <FormGroup>
          <Col smOffset={3} sm={9}>
            <Button bsStyle="primary" type="submit">
              Add New Patient
            </Button>
          </Col>
        </FormGroup>
      </Col>
    </Form>
  </Grid>
);
