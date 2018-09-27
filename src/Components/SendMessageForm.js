import React, { Component } from "react";
import buttonSend from "./../vectors/buttonSend.png";

class SendMessageForm extends Component {
  state = {
    message: ""
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // this.handleChange = this.handleChange.bind(this)

  handleChange(e) {
    this.setState({
      message: e.target.value
    });

    console.log(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <div id="inputContainer">
          <input
            onChange={this.handleChange}
            placeholder="Type message..."
            value={this.state.message}
            type="text"
            id="sendField"
          />

          <button className="btn" id="broadcast"><img src={buttonSend} alt="Send" /></button>
        </div>
      </form>
    );
  }
}

export default SendMessageForm;
