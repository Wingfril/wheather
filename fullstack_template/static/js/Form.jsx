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
      success: (data) => {
        this.setState({message: data});
        if (!(this.state.message === "")) {
            window.location="submit.html";
        }
      },
      error: (data) => {
        this.setState({message: data});
      }
    });
  }

  render() {
    return (
      <div className = "box">
        <form onSubmit={this.handleSubmit}>
          <p>Phone Number:</p>
            <div className='phone_number'>
              <div className='country_code'>
              +1
              </div>
              <input type="text" value={this.state.phone} 
              onChange={this.handleChangePhone} />
            </div>
          <br />
          <p>Zip Code:</p>
            <input type="text" value={this.state.zipcode} 
            onChange={this.handleChangeZip} />
          <br />
          <input className="button" type="submit" value="Submit" />
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Form;