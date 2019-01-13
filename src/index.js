import React from 'react';
import ReactDOM from 'react-dom';
import styles from './main.css';
import App from '@components/App';

const root = document.createElement('div');
const script = document.querySelector('script');

document.body.insertBefore(root, script);

ReactDOM.render(<App />, root);

if (module.hot) module.hot.accept('./components/App.js', () => {
    ReactDOM.render(<App />, root);
});