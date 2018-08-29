import React, {Component} from 'react';
import Contact from './Contact';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getContacts} from "../../actions/contactAction";


class Contacts extends Component {
  componentDidMount() {
    this.props.getContacts();
  };

  render() {
    const {contacts} = this.props;
    return (
      <div>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Contact</span>List
        </h1>
        {
          this.props.connects.map(connect => (
            <Contact key={connect.id} contact={connect}/>
          ))
        }
      </div>
    )
  }
};


Contacts.propTypes = {
  connects: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  connects: state.contact.contacts
});

const mapDispatchToProps = (dispatch) => ({
  getContacts: () => dispatch(getContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
