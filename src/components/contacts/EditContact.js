import React, {Component} from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  };

  async componentDidMount() {
    const {id} = this.props.match.params;
    const res = await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
    const contact = res.data;
    this.setState({
      name:contact.name,
      email:contact.email,
      phone:contact.phone,
    })
  }


  onSubmit = async (dispatch, e) => {
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

    const {id} = this.props.match.params;
    const res = await axios.put(`http://jsonplaceholder.typicode.com/users/${id}`,
      this.state);
    dispatch({type:'UPDATE_CONTACT', payload:res.data});

    //Clear State
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
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={(e) => {
                  this.onSubmit(dispatch, e)
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
                    value='Update Contact'
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    )

  }
};


export default EditContact;
