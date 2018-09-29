import React, { Component } from "react";
import MessageList from "./Components/MessageList";
import SendMessageForm from "./Components/SendMessageForm";
import SignIn from "./Components/SignIn";
import { Route, Switch } from "react-router-dom";
import Chatkit from "@pusher/chatkit";
import "./App.css";
import { instanceLocator, tokenUrl } from "./config";
import buttonSend from "./vectors/buttonSend.svg";


class App extends Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    messages: [],
    name: ""
  };

  // componentDidMount() {
  //   const chatManager = new Chatkit.ChatManager({
  //     instanceLocator: instanceLocator,
  //     userId: "Ann",
  //     tokenProvider: new Chatkit.TokenProvider({
  //       url: tokenUrl
  //     })
  //   });

  //   chatManager.connect().then(currentUser => {
  //     this.currentUser = currentUser;
  //     this.currentUser.subscribeToRoom({
  //       roomId: 17176885,
  //       messageLimit: 20,
  //       hooks: {
  //         onNewMessage: message => {
  //           console.log("message text: ", message.text);
  //           this.setState({
  //             messages: [...this.state.messages, message]
  //           });
  //         }
  //       }
  //     });
  //   });
  // }

  //sending to chatkit - should change to sending to localstorage!!!
  // sendMessage(text) {
  //   this.currentUser.sendMessage({
  //     text: text,
  //     roomId: 17176885
  //   });
  // }
  sendMessage(text) {
    const array = this.state.messages
    console.log(text)
    this.setState({
      messages: [...array, text]
    })
    console.log(this.state.messages)
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(this.state.name);
    localStorage.setItem("name", this.state.name);
    window.location.href = "http://localhost:3000/chat";
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <SignIn
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                name={this.state.name}
              />
            )}
          />

          <Route
            exact
            path="/chat"
            render={() => (
              <div>
                <header>
                  <span className="headingChat">Testovoe zadanie</span>
                </header>
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} name={this.state.nane} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
