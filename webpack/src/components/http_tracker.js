import React, { Component } from 'react';
import PropTypes from 'prop-types';

function renderCall(netCall, idx) {
  let color = 'grey';
  if (netCall.error) {
    color = 'purple';
  } else if (netCall.res) {
    color = netCall.res.ok ? 'green' : 'red';
  }

  return (
    <tr key={(v => v)(idx)}>
      <td>
        <i className={`fa fa-circle ${color}`} aria-hidden="true" />&nbsp;
        {netCall.res && `${netCall.res.status}`}
        {netCall.error && `${netCall.error.message}`}
      </td>
      <td><strong>{netCall.req.method}</strong> {netCall.req.url}</td>
      <td><code>{netCall.body}</code></td>
    </tr>
  );
}

// component
export function HttpTracker(props) {
  return (
    <div className="http-tracker">
      <h3>Test access to the API</h3>
      <form onSubmit={props.onStartCall} className="ink-form column-group">
        <div className="control-group">
          <select
            name="method"
            onChange={props.onEditRequest}
            value={props.editedRequest.method}
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
                onChange={props.onEditRequest}
                type="text"
                value={props.editedRequest.url}
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
        <tbody>{ props.calls.map(renderCall) }</tbody>
      </table>
    </div>
  );
}

// Container
export default class HttpTrackerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [],
      editedRequest: { method: 'GET', url: '' },
    };

    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.handleStartRequest = this.handleStartRequest.bind(this);
  }

  handleEditRequest(evt) {
    switch (evt.target.name) {
      case 'url':
      case 'method':
        this.setState({ editedRequest: Object.assign(
          {},
          this.state.editedRequest,
          { [evt.target.name]: evt.target.value },
        ) });
        break;
      default:
        break;
    }
  }

  handleStartRequest(evt) {
    const currentIndex = this.state.calls.length;
    const HttpRequest = new Request(
      `${this.props.api_url}/${this.state.editedRequest.url}`,
      { method: this.state.editedRequest.method },
    );

    evt.preventDefault();
    this.setState({
      calls: [].concat(this.state.calls, { req: HttpRequest, res: null }),
    });

    fetch(HttpRequest).then((response) => {
      const calls = [].concat(this.state.calls);

      response.text().then((body) => {
        calls[currentIndex].res = response;
        calls[currentIndex].body = body;
        this.setState({ calls });
      });
    }).catch((err) => {
      const calls = [].concat(this.state.calls);
      calls[currentIndex].error = err;
      this.setState({ calls });
    });
  }

  render() {
    return (
      <HttpTracker
        calls={this.state.calls}
        editedRequest={this.state.editedRequest}
        onEditRequest={this.handleEditRequest}
        onStartCall={this.handleStartRequest}
      />
    );
  }
}

HttpTracker.propTypes = {
  onStartCall: PropTypes.func.isRequired,
  onEditRequest: PropTypes.func.isRequired,
  editedRequest: PropTypes.shape({
    method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTION']).isRequired,
    url: PropTypes.string,
  }).isRequired,
  calls: PropTypes.arrayOf(PropTypes.shape({
    req: PropTypes.instanceOf(global.Request),
    res: PropTypes.instanceOf(global.Response),
    err: PropTypes.instanceOf(Error),
  })).isRequired,
};

HttpTrackerContainer.propTypes = {
  api_url: PropTypes.string.isRequired,
};
