import React from 'react';
import ReactDOM from 'react-dom/client';
// 👈 Import store
import { Provider } from 'react-redux';
// 👈 Import Provider
import { RouterProvider } from 'react-router-dom';

import '@/app/i18n';
import '@/styles/index.css';

import router from './app/router';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
