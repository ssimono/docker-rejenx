import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HttpTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      count: null,
      currentRequest: { method: 'GET', url: '' },
    };

    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.handleStartRequest = this.handleStartRequest.bind(this);
  }

  handleEditRequest(evt) {
    switch (evt.target.name) {
      case 'url':
      case 'method':
        this.setState({ currentRequest: Object.assign(
          {},
          this.state.currentRequest,
          { [evt.target.name]: evt.target.value },
        ) });
        break;
      default:
        break;
    }
  }

  handleStartRequest(evt) {
    const currentIndex = this.state.requests.length;
    const HttpRequest = new Request(
      `${this.props.api_url}/${this.state.currentRequest.url}`,
      { method: this.state.currentRequest.method },
    );

    evt.preventDefault();
    this.setState({
      requests: [].concat(this.state.requests, { req: HttpRequest, res: null }),
    });

    fetch(HttpRequest).then((response) => {
      const requests = [].concat(this.state.requests);
      requests[currentIndex].res = response;
      this.setState({ requests });
    }).catch((err) => {
      const requests = [].concat(this.state.requests);
      requests[currentIndex].error = err;
      this.setState({ requests });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleStartRequest}>
          <h2>Test access to the API</h2>
          <select
            name="method"
            onChange={this.handleEditRequest}
            value={this.state.currentRequest.method}
          >

            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          /<input
            name="url"
            onChange={this.handleEditRequest}
            type="text"
            value={this.state.currentRequest.url}
          />
          <input type="submit" value="OK" />
        </form>
        <ul>
          { this.state.requests.map((request, idx) => (
            <li key={(v => v)(idx)}>
              <span>{request.req.method} {request.req.url}</span>
              <span>
                {request.res ? ` - ${request.res.status}` : '...'}
                {request.error && ` - ${request.error.message}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

HttpTracker.propTypes = {
  api_url: PropTypes.string.isRequired,
};
