import React, { Component } from 'react';

class Username extends Component {
    state = {
        username: ''
    }
    onChange = e => {
        this.setState({ username: e.target.value }); //this is done so that everything you print in UserName field could be reflected in UserName field
      };

      onSubmit = e => {
          e.preventDefault();
          this.props.onSubmit(this.state.username)
      }


  render() {
    return (
      <div>
          <form onSubmit={this.onSubmit}>
      <input type="text" placeholder="enter your username" onChange={this.onChange} />
      <input type="text" placeholder="enter your password" />
      <input type="submit" />
      </form>
      </div>
    );
  }
}

export default Username;
