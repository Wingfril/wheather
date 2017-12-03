import React from "react";
import Form from "./Form";
require('../main.css');

class App extends React.Component {
  render () {
    return (
    <div>
    	<div className='header'>
        	<h1>wheather</h1>
        </div>
        <Form />
    </div>
    );
    }
}


export default App;