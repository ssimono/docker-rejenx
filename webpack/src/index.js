import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import HttpTrackerContainer from './components/http_tracker';

function Demo(props) {
  return (
    <HttpTrackerContainer api_url={props.api_url} />
  );
}

Demo.propTypes = {
  api_url: PropTypes.string.isRequired,
};

render(<Demo api_url={process.env.API_URL} />, document.getElementById('main'));
