import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    name: ""
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });

    console.log(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(this.state.name)
    window.location.href = "http://localhost:3000/chat"

    // this.props.sendMessage(this.state.message)
    // this.setState({
    //     message: ''
    // })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="sign-in">
        <input
          onChange={this.handleChange}
          placeholder="Enter Your Name"
          value={this.state.name}
          type="text"
        />
      </form>
    );
  }
}

export default SignIn;
