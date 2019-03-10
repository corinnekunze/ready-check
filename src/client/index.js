import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './app-router';
import './styles/app.css';

ReactDOM.render(
  <Router>
    <AppRouter />
  </Router>,
  document.getElementById('ready-check-app')
);
