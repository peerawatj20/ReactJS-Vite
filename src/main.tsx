import React from 'react';
import ReactDOM from 'react-dom/client';
// 👈 Import store
import { Provider } from 'react-redux';
// 👈 Import Provider
import { RouterProvider } from 'react-router-dom';

import '@/app/i18n';
import '@/styles/index.css';
import { PersistGate } from 'redux-persist/integration/react';

import router from './app/router';
import { persistor, store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
