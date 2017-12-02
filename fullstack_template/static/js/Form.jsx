import React from "react";

var $ = require('jquery');

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        phone: '',
        zipcode: ''};

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeZip = this.handleChangeZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePhone(event) {
    this.setState({phone: event.target.value});
  }

  handleChangeZip(event) {
    this.setState({zipcode: event.target.value});
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.phone);
  //   event.preventDefault();
  // }

  handleSubmit(event) {
    event.preventDefault();
    var data = {
      phone: this.state.phone,
      zipcode: this.state.zipcode
    };
    $.get(window.location.href + '_info', (data) => {
      console.log(data);
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Phone Number:</p>
          <input type="text" value={this.state.phone} onChange={this.handleChangePhone} />
        <br />
        <p>Zip Code:</p>
          <input type="text" value={this.state.zipcode} onChange={this.handleChangeZip} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;