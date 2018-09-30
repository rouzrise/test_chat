import React, { Component } from "react";
import buttonSend from "./../vectors/buttonSend.png";

class Messages extends Component {
  state = {
    message: "",
    messages: [],
    alignMessages: 'float-right'
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  componentDidMount() {
    if (
      this.state.messages === [] ||
      localStorage.getItem("messages") === null
    ) {
      return;
    } else {
      let messages = JSON.parse(localStorage.getItem("messages"));
      this.setState({
        messages: messages
      });
    }
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }

  sendMessage(text) {
    let message = {};
    let messages = [];
    let h = new Date();
    let time = `${h.getHours()}:${h.getMinutes()}`;

    if (text.trim() === "") {
      return;
    }


    message.name = localStorage.getItem("name")
    message.text = text
    message.time = time

    message.class = this.state.position
    const array = this.state.messages
    messages = [...array, message]
    console.log(messages)
    this.setState({
      messages: messages
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    this.renderMessages();
  }

  renderMessages() {
    if (localStorage.getItem("messages") === null) {
      return;
    } else {
      const messages = JSON.parse(localStorage.getItem("messages"));

      return messages.map(message => {
        const classNames = `${this.state.alignMessages} message clearfix`
        return (
          <div className={classNames}>
            <div className="text">{message.text}</div>
            <div><span className="time">{message.time}</span>  <span className="name">{message.name}</span></div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="messages">
      <div className="chatArea">
        <div className="dayTime">Today at {new Date().getHours()}:{new Date().getMinutes()}</div>
        <div className="message-list">{this.renderMessages()}</div>
        </div>
        <form onSubmit={this.handleSubmit} className="send-message-form">
          <div id="inputContainer">
            <input
              onChange={this.handleChange}
              placeholder="Type message..."
              value={this.state.message}
              type="text"
              id="sendField"
            />

            <button className="btn" id="broadcast">
              <img src={buttonSend} alt="Send" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Messages;
