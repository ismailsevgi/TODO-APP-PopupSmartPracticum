import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../css/styles.css';
import { GlobalContextProvider } from './Components/GlobalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
