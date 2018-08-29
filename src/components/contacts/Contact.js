import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {deleteContact} from '../../actions/contactAction'

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      showContactInfo: false,
    };
  }

// delet@ grel em vor asyncov vorovhetev delet-i jamnak qani vor nor avelacrac@
  // chka fiktiv backendum errora talis chnayac sranic hetoel eli erro@ talis bayc jnjuma
  // u parametrakan funciayi jamnak asyn@ grvuma parametreric araj isk hakaraki jamanak dem@
  onDeleteClick = async (id) => {
      this.props.deleteContact(id)
  };

  render() {
    const {name, email, phone, id} = this.props.contact;
    return (

      <div className="card card-body mb-3" >
        <h4>{name} <i onClick={() => {
          this.setState({showContactInfo: !this.state.showContactInfo})
        }} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
          <i className="fas fa-times"
             style={{cursor: 'pointer', float: 'right', color: 'red'}}
             onClick={() => {
               this.onDeleteClick(id)
             }}
          />
          <Link to={`contact/edit/${id}`}>
            <i className="fas fa-pencil-alt"
               style={{cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem'}}/>
          </Link>
        </h4>
        {this.state.showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  connects: state.contact.contacts
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => dispatch(deleteContact(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(Contact);
