import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import SendMessageForm from "./Components/SendMessageForm";
import Chatkit from "@pusher/chatkit";
import "./App.css";
import { instanceLocator, tokenUrl } from "./config";

class App extends Component {
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
      currentUser.subscribeToRoom({
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
  render() {
    return (
      <div>
    <MessageList messages={this.state.messages} />
    <SendMessageForm />
    </div>
    )
  }
}

export default App;
