// @flow
import 'babel-polyfill';

import { hot } from 'react-hot-loader'
import * as React from 'react'
import { render } from 'react-dom';
import App from './App';

const rootEl = document.getElementById('root');

if (rootEl) {
  render(<App />, rootEl);
} else {
  throw new Error('wrong rootEl');
}
