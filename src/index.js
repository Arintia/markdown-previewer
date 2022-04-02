import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './components/App/App';

const container = ReactDOMClient.createRoot(document.getElementById("root"));
container.render(<App />);