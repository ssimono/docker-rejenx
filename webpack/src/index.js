import React, { Component } from 'react';
import {render} from 'react-dom';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { val: '' };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({ val: evt.target.value });
  }

  render() {
    return (
      <p>
        <input type="text" value={this.state.val} onChange={this.handleChange} />
        <span> {this.state.val}</span>
      </p>
    )
  }
}

render(<Demo />, document.getElementById('main'));
