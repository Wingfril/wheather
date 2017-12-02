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
      phonenum: this.state.phone,
      zipcode: this.state.zipcode
    };


    $.ajax({
      type:"POST",
      url:$SCRIPT_ROOT + "/_info",
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });

    // console.log(data);
    // $.get('/_info', (data) => {
    //     console.log(data);
    // })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Phone Number:</p>
          <input type="text" value={this.state.phone} 
          placeholder="phone number" onChange={this.handleChangePhone} />
        <br />
        <p>Zip Code:</p>
          <input type="text" value={this.state.zipcode} 
          placeholder="zip code" onChange={this.handleChangeZip} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;