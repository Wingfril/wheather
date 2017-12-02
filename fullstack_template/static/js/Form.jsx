import React from "react";

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
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Phone Number:
          <input type="text" value={this.state.phone} onChange={this.handleChangePhone} />
        </label>
        <label>
          Zip Code:
          <input type="text" value={this.state.zipcode} onChange={this.handleChangeZip} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;