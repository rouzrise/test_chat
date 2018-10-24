import React, { Component } from "react";
import buttonSend from "./../vectors/buttonSend.png";
import uuid from "uuid";
import closeMsg from "./../vectors/closeMsg.svg";

class Messages extends Component {
  constructor() {
    super();
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    // this.onClickMessages = this.onClickMessages.bind(this);
    this.removeMsg = this.removeMsg.bind(this);
  }

  state = {
    message: "",
    messages: [],
    //TO BE DONE - not used now - is created for later differentiation of msgs sent by user and his interlocutor - it should be changed by function (create later) that changes state to '' if message is sent by users interlocuter, not user himself to be reflected on another side of screen
    alignMessages: "chatArea__msgBlockContainer_owner clearfix", //to be considered - as soon as it should be stored in msgs of particular user so that msgs could be reflected on different sides (not to be kept in state!!!)
    focusOutline: "screen__sendButton screen__sendButton_noFocus", //for submit msgs button
    time: ""
  };

  //before mounting component
  componentDidMount() {
    //sets focus to input field (with  id="userName") when component is rendered
    this.nameInput.focus();

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

  //returns focus ring around submit msgs button if tab key is used
  handleKeyUp(e) {
    if (e.keyCode === 9) {
      this.setState({
        focusOutline: "screen__sendButton"
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
    //keeps input focused after submitting msg
    this.nameInput.focus();
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
    message.dateClasses =
      message.showDayMonth !== "" && this.state.messages.length === 0
        ? "chatArea__data chatArea__data_firstData clearfix"
        : message.showDayMonth !== ""
          ? "chatArea__data clearfix"
          : "";

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

  //   onClickMessages() {
  // TO BE DONE
  //   }

  //handles message removing after close click
  removeMsg(message) {
    this.setState(state => ({
      messages: state.messages.filter(c => c.key !== message.key)
    }));
    //use auxiliary variable (auxVar) - can't use this.state.messages unstead - because it is this.setState is asynchronous - and happens AFTER operations over localStorage :(((
    let auxVar = this.state.messages.filter(c => c.key !== message.key); //auxiliary variable to keep all the messages except for the one to be deleted
    localStorage.removeItem("messages"); //remove old local storage content
    localStorage.setItem("messages", JSON.stringify(auxVar)); //populate local storage wz new conternt (without deleted message)
    this.renderMessages();
    //keeps input focused
    this.nameInput.focus();
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
        const classNames = `${
          this.state.alignMessages
        } chatArea__msgBlockContainer`;
        return (
          <div key={message.key} className="elContainer">
            <div className={message.dateClasses}>{message.showDayMonth}</div>
            <div className={classNames}>
              <div className="msgBlock" id="message">
                <div className="msgBlock__text">{message.text}</div>
                <div className="msgBlock__attrs attrs">
                  <img
                    src={closeMsg}
                    className="attrs__close"
                    alt="close message"
                    onClick={() => this.removeMsg(message)}
                  />
                  <span className="attrs__name">{message.name}</span>{" "}
                  <span className="attrs__time">{message.time}</span>
                </div>
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
    console.log("yeah");
  }

  render() {
    return (
      <div className="elContainer">
        <div className="screen__chatArea chatArea">
          <div>{this.renderMessages()}</div>
          <div
            style={{ float: "left", clear: "both" }} // elem to be point to scroll to bottom
            ref={el => {
              this.endMsg = el;
            }}
          />
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="screen__msgInputForm msgInputForm"
        >
          <input
            className="msgInputForm__sendField"
            onChange={this.handleChange}
            placeholder="Type message..."
            value={this.state.message}
            type="text"
            id="sendField"
            autoComplete="off"
            ref={input => {
              this.nameInput = input;
            }} //is used to set focus in componentDidMount method
          />

          <button
            className={this.state.focusOutline}
            id="broadcast"
            onKeyUp={this.handleKeyUp}
          >
            <img src={buttonSend} alt="Send" />
          </button>
        </form>
      </div>
    );
  }
}

export default Messages;
