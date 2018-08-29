import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';
import axios from 'axios';
import {connect} from 'react-redux';
import {addContact} from "../../actions/contactAction";

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  };
  onSubmit = ( e) => {
    e.preventDefault();
    const {name, email, phone,} = this.state;
    //Check For Errors
    for (let key in this.state) {
      if (key !== 'errors') {
        if (e.target[key].value === '') {
          this.setState({errors: {[e.target[key].name]: `${e.target[key].name} is required`}})
          return;
        }
      }
    }


    const newContact = {
      name,
      email,
      phone
    };
    this.props.addContact(newContact);


    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    });
    this.props.history.push('/')
  };
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  render() {
    const {name, email, phone, errors} = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={(e) => {
            this.onSubmit( e)
          }}>
            <TextInputGroup
              name="name" label="Name"
              value={name}
              placeholder="Enter Name..."
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              name="email"
              label="Email"
              type="email"
              value={email}
              placeholder="Enter Email..."
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              name="phone"
              label="Phone"
              value={phone}
              placeholder="Enter Phone..."
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value='Add Contact'
              className="btn btn-block btn-primary"
            />
          </form>
        </div>
      </div>

    )
  }
};

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  connects: state.contact.contacts
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (contact) => dispatch(addContact(contact))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
