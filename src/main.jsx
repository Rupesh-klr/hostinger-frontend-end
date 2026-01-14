// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct way for React 18+
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
// Import Global CSS from assets folder
import './assets/css/main.css';

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);