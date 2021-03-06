import React, {Component} from 'react';
import {Field, reduxForm,FieldArray} from 'redux-form';
import {customInput, customSelect, discounts} from '../fields';
import capitalize from 'capitalize';
import {
  required,
  minLength,
  maxLength,
  matchesPassword,
  asyncValidate,
  email
} from '../../validation';
import './RegisterForm.css'

class RegisterForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="firstname"
          component={customInput}
          type="text"
          label="First Name"
          validate={[required]}
          normalize = {capitalize}
        />
        <Field
          name="surname"
          component={customInput}
          type="text"
          label="Surname"
          validate={[required]}
          normalize = {capitalize}
        />
        <Field
          name="username"
          component={customInput}
          type="text"
          label="Username"
          validate={[required, minLength, maxLength]}
        />
        {/*<Field*/}
          {/*name="email"*/}
          {/*component={customInput}*/}
          {/*type="text"*/}
          {/*label="Email"*/}
          {/*validate={[email,]}*/}
        {/*/>*/}
        <Field
          name="password"
          component={customInput}
          type="password"
          label="Password"
          validate={[required]}
        />
        <Field
          name="confirmPassword"
          component={customInput}
          type="password"
          label="Confirm Password"
          validate={[required, matchesPassword]}
        />
        <Field
          name="preference"
          component={customSelect}
          label="Preferred Formatting"
        />
        <Field
          name="newsletter"
          component={customInput}
          type="checkbox"
          label="Newsletter"
        />
        <FieldArray name="discountCodes" component={discounts}/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

RegisterForm = reduxForm({
  form: 'register',
  asyncValidate,
  asyncBlurFields: ['username']
})(RegisterForm);

export default RegisterForm;