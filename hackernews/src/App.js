import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    var helloWorld = {message: 'Welcome to the Road to learn React', firstName: 'Joe', lastName: 'Bloggs'}
    return (
      <div className="App">
        <h2>{helloWorld.message}</h2>
        <p>Hi {helloWorld.firstName} {helloWorld.lastName}!</p>
      </div>
    );
  }
}

export default App;