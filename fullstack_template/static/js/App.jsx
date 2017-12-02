import React from "react";
import Form from "./Form";


class App extends React.Component {
  render () {
    return (
    <div>
        <h1>wheather wow</h1>
        <p>Hello! wow</p>
        <form>
            <input type="text" name="number" placeholder="phone number" />
            <input type="submit" value="submit" />
        </form>
        <Form />
    </div>
    );
    }
}

export default App;