import React, { Component } from "react";
import PropTypes from "prop-types";
import msgs from "./../vectors/msgs.png";

class SignIn extends Component {
  componentDidMount() {
    //sets focus to input field (with  id="userName") when component is rendered
    this.nameInput.focus();
  }

  render() {
    return (
      <div className="fullScr">
        <div className="fullScr__firstBgBlock" />
        <div className="fullScr__secondBgBlock" />
        <div className="fullScr__appName">Chat</div>
        <img
          src={msgs}
          alt="Chat decorative icon"
          className="fullScr__chatIcon"
        />
        {/* login form */}
        <div className="fullScr__loginFormWrapper">
          <form className="loginForm" onSubmit={this.props.handleSubmit}>
            <fieldset>
              <label className={this.props.signInRef}>Username</label>
              <input
                className={this.props.signInBorder}
                placeholder="Enter Your Name"
                type="text"
                id="userName"
                onChange={this.props.handleChange}
                value={this.props.name}
                // required //made other way
                ref={input => {
                  this.nameInput = input;
                }} //is used to set focus in componentDidMount method
              />

              <label className="loginForm__label">Password</label>
              <input
                className="loginForm__input"
                type="text"
                id="password"
                name="password"
                placeholder="Enter Your Password"
              />

              <button className="loginForm__submit" type="submit">
                        Get Started
                  </button>
                  <div className="loginForm__submitBg"></div>
            </fieldset>
          </form>
        </div>

        <div className="fullScr__footerTextWrapper">
            <div className="footerText">
                <span>Not registered?</span> <a className="footerText__link" href="">Create Account</a>
            </div>
        </div>
      </div>
    );
  }
}

export default SignIn;

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
  signInRef: PropTypes.string,
  signInBorder: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string
};
