import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import SendMessageForm from "./Components/SendMessageForm";
import Chatkit from "@pusher/chatkit";
import "./App.css";
import { instanceLocator, tokenUrl } from "./config";

class App extends Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }

  state = {
    messages: []
  };
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "Ann",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: 17176885,
        messageLimit: 20,
        hooks: {
          onNewMessage: message => {
            console.log("message text: ", message.text);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }


  //sending to chatkit - should change to sending to localstorage!!!
  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: 17176885
    });
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
