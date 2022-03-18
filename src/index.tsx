import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ResetTokenContextProvider from './context/reset-token/ResetTokenContext';

ReactDOM.render(
  <React.StrictMode>
    <ResetTokenContextProvider>
      <App />
    </ResetTokenContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


