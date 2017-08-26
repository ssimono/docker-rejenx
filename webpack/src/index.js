import React, { Component } from 'react';
import { render } from 'react-dom';

import HttpTracker from './http_tracker';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HttpTracker api_url={process.env.API_URL} />
    );
  }
}

render(<Demo />, document.getElementById('main'));
