import React from "react";

export default class App extends React.Component {
  render () {
    return (
<div>
    <h1>wheather</h1>
    <p>Hello!</p>
    <form>
        <input type="text" name="number" placeholder="phone number" />
        <input type="submit" value="submit" />
    </form>
</div>
    );
    }
}
