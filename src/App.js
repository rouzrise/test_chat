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

  sendMessage(text) {
    const array = this.state.messages
    const name = localStorage.getItem("name")
 
    this.setState({
      name: name,
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
                <Messages />
                {/* <MessageList messages={this.state.messages} name={this.state.name}/>
                <SendMessageForm sendMessage={this.sendMessage} /> */}
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
