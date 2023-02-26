import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import './main.scss';
import FlagSvg from './components/svgIcons/FlagSvg';
const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App></App>
  </Provider>,
);
