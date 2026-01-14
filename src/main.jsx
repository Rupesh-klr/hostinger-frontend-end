// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// src/main.jsx
// import React from 'react';
// import { createRoot } from 'react-dom/client'; // Correct way for React 18+
// import { Provider } from 'react-redux';
// import { store } from './store/store';

// import App from './App';
// // Import Global CSS from assets folder
// import './assets/css/main.css';


// const container = document.getElementById('root');
// const root = createRoot(container); 

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import App from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store'; // Check this path
import App from './App';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);