import React, { Component } from "react";

class SendMessageForm extends Component {
state = {
    message: ''
}

constructor() {
    super()
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
}

// this.handleChange = this.handleChange.bind(this)

    handleChange(e) {
        this.setState({
            message: e.target.value
        })

        console.log(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.message);
    }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
    <input
    onChange={this.handleChange}
    placeholder="Type message..." value={this.state.message} type="text" />
      </form>
    );
  }
}

export default SendMessageForm;
