import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Create your Group</h1>

        <form action="/groups" method="POST">
          <input type="text" placeholder="group name" name="name" />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}
