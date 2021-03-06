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
    signInRef: "loginForm__label",
    signInBorder: "loginForm__input"
  };

  //handles input of userName
  handleChange(e) {
    this.setState({
      name: e.target.value,
      signInRef: "loginForm__label",
      signInBorder: "loginForm__input"
    });
  }

  //handles submitting of form wz username data
  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.name;

    //checks if there is an empty input of name - prevents
    if (name.trim() === "") {
      this.setState({
        signInRef: "loginForm__label loginForm__label_alarm",
        signInBorder: "loginForm__input loginForm__input_alarm"
      });
      document.getElementById("userName").focus(); //sets focus to input field wz id="userName"
      return;
    } else {
      this.setState({
        signInRef: "loginForm__label",
        signInBorder: "loginForm__input"
      });
      //keeps name input by user in local storage
      localStorage.setItem("name", this.state.name);

      //redirects browser to another page after user submits data
      window.location.href = "https://rouzrise.github.io/test_chat/#/chat";
      // window.location.href = "http://localhost:3000/#/chat";
    }
  }

  render() {
    return (
      <div className="app">
        {/* uses React Router for navigating */}
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
                signInBorder={this.state.signInBorder}
              />
            )}
          />

          <Route
            exact
            path="/chat"
            render={() => (
              <div className="container">
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
