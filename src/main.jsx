import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. <App />을 <Provider>로 감싸고, store를 prop으로 전달합니다. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);