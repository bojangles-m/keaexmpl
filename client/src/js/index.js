import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 👈 add this
import { BrowserRouter } from 'react-router-dom';
import { getContext } from 'kea'; // 👈 add this
import App from './containers/App';

import 'index.scss';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={getContext().store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
