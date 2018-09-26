import React, { Component } from 'react';
import MessageList from './Components/MessageList';
import Chatkit from '@pusher/chatkit';
import './App.css';
import {instanceLocator, tokenUrl} from './config';


class App extends Component {
componentDidMount() {
  const chatManager = new Chatkit.ChatManager ({
    instanceLocator: instanceLocator,
    userId: 'Ann',
    tokenProvider: new Chatkit.TokenProvider({
      url: tokenUrl
    })
    
  })

  chatManager.connect()
  .then(currentUser => {
    currentUser.subscribeToRoom ({
      roomId: 17176885,
      messageLimit: 20,
      hooks: {
        onNewMessage: message => {
          console.log('message text: ', message.text);
        }
      }
    })
  })
}
  render() {
    return (
     <MessageList/>
    );
  }
}

export default App;
