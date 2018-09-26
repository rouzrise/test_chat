import React, { Component } from 'react';
import MessageList from './Components/MessageList';
import Chatkit from '@pusher/chatkit';
import './App.css';


class App extends Component {
componentDidMount() {
  const chatManager = new Chatkit.chatManager ({

  })
}
  render() {
    return (
     <MessageList/>
    );
  }
}

export default App;
