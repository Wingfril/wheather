import React from "react";

class SubmitPage extends React.Component {

constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location="/";
  }


	render () {
    return (
    <div>
    	<div className='header'>
        	<h1>wheather</h1>
        </div>
        <h3>Thanks for subscribing to wheather!</h3>
        <div className='box'>
            <p>You'll now receive daily texts letting you know how best to
            dress for the day's weather!</p>
        <button type="button" className="return" onClick={this.handleClick}>Back to Home</button>
        </div>
        <div className='footer'>
            <p>&copy; 2017 Shawna Huang, Ziyan Mo, Huayu Ouyang</p>
        </div>
    </div>
    );
    }
}

export default SubmitPage;