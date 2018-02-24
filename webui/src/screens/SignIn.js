import React from 'react';
import {
  Alert,
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
import { isEmail } from '../../../server/src/lib/validation'; /* LoL */
import * as authlib from '../lib/auth';

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = { email: null, emailSent: false, error: null, loading: false };
    this.onSubmit = this.onSubmit.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this);
    this.getEmailValidationState = this.getEmailValidationState.bind(this)
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      await authlib.signIn(this.state.email);
      this.setState({ emailSent: true, error: null });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onEmailChange(event) {
    const email = event.target.value;
    this.setState({ email });
  }

  getEmailValidationState() {
    if (!this.state.email) return null; /* Field wasn't touched yet */
    try { isEmail(this.state.email); return null; } /* Success */
    catch (error) { return 'error'; }
  }

  render() {
    return (
      <Grid style={{ paddingTop: 40 }}>
        <Row>
          <Col md={12}><h2>Sign-in</h2></Col>
        </Row>
        { this.state.error &&
          <Row>
            <Col md={12}>
              <Alert bsStyle="warning">
                <strong>Oh no!</strong> we couldn't get you in.
                There's an error using this email address:
                {' '}
                <strong>{this.state.error}</strong>
              </Alert>
            </Col>
          </Row> }
        { this.state.emailSent &&
          <Row>
            <Col md={12}>
              <Alert bsStyle="info">
                <strong>Awesome!</strong> We do know that email! Please
                go check your email and click in the link to get you in!
                Feel free to close this page.
              </Alert>
            </Col>
          </Row> }
        { !this.state.emailSent &&
          <Form horizontal onSubmit={this.onSubmit}>
            <Col md={8}>
              <TextField
                id="email"
                label="Email Address"
                onChange={this.onEmailChange.bind(this)}
                validationState={this.getEmailValidationState()}
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
          </Form> }
      </Grid>
    );
  }
}
