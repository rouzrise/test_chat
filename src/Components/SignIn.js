import React, { Component } from "react";
import msgs from "./../vectors/msgs.svg";

class SignIn extends Component {


  render() {
    return (
      <div>
        <h1 className="chatName">Chat</h1>
        <img src={msgs} className="messagesSign" alt="messages sign" />
        <form onSubmit={this.props.handleSubmit} className="sign-in">
          <fieldset>
            <label>Username</label>
            <input
              onChange={this.props.handleChange}
              placeholder="Enter Your Name"
              value={this.props.name}
              type="text"
            />
            <label>Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />

            <button type="submit" className="right">
              Get Started
            </button>
            <div className="blueStrip"></div>
            {/* <input type="submit" value="Submit" /> */}
          </fieldset>
        </form>

        <div className="blackBg"></div>

        <div className="footerText">
          <span>Not registered? </span>
          <a className="linkToSignUp" href="">
            Create Account
          </a>
        </div>
      </div>
    );
  }
}

export default SignIn;
