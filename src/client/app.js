import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/components/App.jsx';

ReactDOM.render(<App {...window.__APP_INITIAL_STATE__} />, document.getElementById('app'));
