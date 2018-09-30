import React, { Component } from "react";
import Messages from "./Components/Messages";
import SignIn from "./Components/SignIn";
import { Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    name: "",
    signInRef: "regular"
  };

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;
    if (name.trim() === "") {
      this.setState({
        signInRef: "attention"
      });
      return;
    } else {
      this.setState({
        signInRef: "regular"
      });
      localStorage.setItem("name", this.state.name);
      window.location.href = "http://localhost:3000/chat";
    }
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
                signInRef={this.state.signInRef}
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
                <Messages name={this.state.name} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
