import React, { Component } from "react";
import buttonSend from "./../vectors/buttonSend.png";
import uuid from "uuid";

class Messages extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  state = {
    message: "",
    messages: [],
    //TO BE DONE - not used now - is created for later differentiation of msgs sent by user and his interlocutor - it should be changed by function (create later) that changes state to '' if message is sent by users interlocuter, not user himself to be reflected on another side of screen
    alignMessages: "float-right",
    time: ""
  };

  //before mounting component
  componentDidMount() {
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
      // invokes function to scroll msgs - better to put in componentDidUpdate()
      // this.scrollToBottom();
    }
  }

  //invokes function to scroll msgs; if putting into componentDidMount() - scrolling is not full ('last msg not scrolled')
  componentDidUpdate() {
    this.scrollToBottom();
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
    let date = String(h.getDate()).length > 1 ? h.getDate() : `0${h.getDate()}`;
    let monthNumber = h.getMonth();
    let month;

    //turns months from numbers into words:)
    switch (monthNumber) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
    }

    //keeps time of sending message
    let time = this.calculateTime();

    // prevents sending empty msgs
    if (text.trim() === "") {
      return;
    }

    //gets user name from local storage
    message.name = localStorage.getItem("name");
    message.text = text;
    message.time = time;
    message.key = uuid.v4();
    // message.dayMonth = `${date} ${month} ${Date.now()}`; //test
    message.dayMonth = `${date} ${month}`;

    //assigns showDayMonth to existing day and month depending on if it's the first msg in row or if the neighbour messages were written in different days
    message.showDayMonth =
      this.state.messages.length === 0
        ? `${date} ${month}`
        : message.dayMonth ===
          this.state.messages[this.state.messages.length - 1].dayMonth
          ? ""
          : `${date} ${month}`;

    //assigns class in case message and day are shown over msg
    message.class = message.showDayMonth === "" ? "" : "dayMonth";

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

  //calculates time
  calculateTime() {
    let h = new Date();
    let hours =
      String(h.getHours()).length > 1 ? h.getHours() : `0${h.getHours()}`;
    let minutes =
      String(h.getMinutes()).length > 1 ? h.getMinutes() : `0${h.getMinutes()}`;
    let time = `${hours}:${minutes}`;
    return time;
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
          <div>
            <div className={message.class}>{message.showDayMonth}</div>
            <div className={classNames} key={message.key}>
              <div className="text">{message.text}</div>
              <div className="msgAttrs">
                <span className="name">{message.name}</span>{" "}
                <span className="time">{message.time}</span>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  // handles scrolling of msgs
  scrollToBottom() {
    this.endMsg.scrollIntoView({ behavior: "instant" });
  }

  render() {
    return (
      <div className="messages">
        <div className="chatArea">
          {/* <div className="dayTime">
            Today at {new Date().getHours()}:{new Date().getMinutes()}
          </div> */}
          <div className="message-list">{this.renderMessages()}</div>
          <div
            style={{ float: "left", clear: "both" }} // elem to be point to scroll to bottom
            ref={el => {
              this.endMsg = el;
            }}
          />
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
