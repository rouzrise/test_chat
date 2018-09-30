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

  //handles input of userName
  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  //handles submitting of form wz username data
  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;

    //checks if there is an empty input of name - prevents
    if (name.trim() === "") {
      this.setState({
        signInRef: "attention"
      });
      return;
    } else {
      this.setState({
        signInRef: "regular"
      });
      //keeps name input by user in local storage
      localStorage.setItem("name", this.state.name);
    
      //redirects browser to another page after user submits data
      window.location.href = "https://rouzrise.github.io/test_chat/chat";
    }
  }

  render() {
    return (
      <div className="app">
      
      {/* uses React Router for navigating */}
        <Switch>
          <Route
            exact
            path="https://rouzrise.github.io/test_chat/"
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
            path="https://rouzrise.github.io/test_chat/chat"
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
