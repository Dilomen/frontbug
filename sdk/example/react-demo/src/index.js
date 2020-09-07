import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import vangenBug from 'vangen-sdk'
const { ErrorWatch } = vangenBug.init({
  BASE_URL:"http://localhost:3090"
})
const ErrorMonitor = ErrorWatch(React)
ReactDOM.render(<ErrorMonitor>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorMonitor>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
