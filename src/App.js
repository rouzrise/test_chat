import React, { Component } from 'react';
import Username from './Components/Username';
import './App.css';

class App extends Component {
  render() {
    return (
     <Username onSubmit={username => alert(username)} />
    );
  }
}

export default App;
