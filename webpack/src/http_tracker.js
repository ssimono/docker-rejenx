import React, { Component } from 'react';
import PropTypes from 'prop-types';

function renderRequest(request, idx) {
  let color = 'grey';
  if (request.error) {
    color = 'purple';
  } else if (request.res) {
    color = request.res.ok ? 'green' : 'red';
  }

  return (
    <tr key={(v => v)(idx)}>
      <td>
        <i className={`fa fa-circle ${color}`} aria-hidden="true" />&nbsp;
        {request.res && `${request.res.status}`}
        {request.error && `${request.error.message}`}
      </td>
      <td><strong>{request.req.method}</strong> {request.req.url}</td>
      <td><code>{request.body}</code></td>
    </tr>
  );
}

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

      response.text().then((body) => {
        requests[currentIndex].res = response;
        requests[currentIndex].body = body;
        this.setState({ requests });
      });
    }).catch((err) => {
      const requests = [].concat(this.state.requests);
      requests[currentIndex].error = err;
      this.setState({ requests });
    });
  }

  render() {
    return (
      <div className="http-tracker">
        <h3>Test access to the API</h3>
        <form onSubmit={this.handleStartRequest} className="ink-form column-group">
          <div className="control-group">
            <select
              name="method"
              onChange={this.handleEditRequest}
              value={this.state.currentRequest.method}
            >

              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          <div className="control-group api-root">
            <mark>/</mark>
          </div>

          <div className="control-group">
            <div className="control append-button">
              <span>
                <input
                  name="url"
                  onChange={this.handleEditRequest}
                  type="text"
                  value={this.state.currentRequest.url}
                />
              </span>
              <input type="submit" value="OK" className="ink-button" />
            </div>
          </div>
        </form>
        <table className="ink-table alternating">
          <thead>
            <tr>
              <td>Status</td>
              <td>Request</td>
              <td>Body</td>
            </tr>
          </thead>
          <tbody>{ this.state.requests.map(renderRequest) }</tbody>
        </table>

      </div>
    );
  }
}

HttpTracker.propTypes = {
  api_url: PropTypes.string.isRequired,
};
