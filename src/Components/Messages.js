import React, { Component } from "react";
import buttonSend from "./../vectors/buttonSend.png";

class Messages extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  state = {
    message: "",
    messages: [],
    //TO BE DONE - not used now - is created for later differentiation of msgs sent by user and his interlocutor - it should be changed by function (create later) that changes state to '' if message is sent by users interlocuter, not user himself to be reflected on another side of screen
    alignMessages: "float-right"
  };

//before mounting component
  componentWillMount() {
    // checks if there are no previous messages kept
    if (
      this.state.messages === [] ||
      localStorage.getItem("messages") === null
    ) {
      return;
    } else {
      //if there messages kept - takes them from local storage
      let messages = JSON.parse(localStorage.getItem("messages"));
      this.setState({
        messages: messages
      });
    }
  }

  // handles input of messages 
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  // handles submitting button to send messages
  handleSubmit(e) {
    e.preventDefault();
    //invokes sendMessage function with inputted text which was earlier kept in this.state.message
    this.sendMessage(this.state.message);
    //clears input field after msg is sent
    this.setState({
      message: ""
    });
  }

//handles sending messages
  sendMessage(text) {
    let message = {};
    let messages = [];
    let h = new Date();
    //keeps time of sending message 
    let time = `${h.getHours()}:${h.getMinutes()}`;

    // prevents sending empty msgs
    if (text.trim() === "") {
      return;
    }

    //gets user name from local storage
    message.name = localStorage.getItem("name");
    message.text = text;
    message.time = time;

    const array = this.state.messages;
    // adds new msg to array of previous msgs
    messages = [...array, message];
    // keeps all the msgs in messages state
    this.setState({
      messages: messages
    });

    // keeps all the msgs in local storage
    localStorage.setItem("messages", JSON.stringify(messages));

    // invokes renderMessages function
    this.renderMessages();
  }

  // handles messages rendering
  renderMessages() {
    // checks if there are no msgs in local storage
    if (localStorage.getItem("messages") === null) {
      return;
    } else {
      // if there are msgs in local storage - gets them from local storage and renders them on screen in chat area
      const messages = JSON.parse(localStorage.getItem("messages"));

      return messages.map(message => {
        const classNames = `${this.state.alignMessages} message clearfix`;
        return (
          <div className={classNames}>
            <div className="text">{message.text}</div>
            <div>
              <span className="time">{message.time}</span>{" "}
              <span className="name">{message.name}</span>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="messages">
        <div className="chatArea">
          <div className="dayTime">
            Today at {new Date().getHours()}:{new Date().getMinutes()}
          </div>
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
