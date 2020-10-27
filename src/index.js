import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { mount, route } from 'navi';
import { Router, View } from 'react-navi';
import Layout from './components/Layout';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import './index.css';

// Define the app routes
const routes = mount({
  '/': route({
    title: "About us",
    view: <About />
  }),
  '/dashboard': route({
    title: "Dashboard",
    view: <Dashboard />
  }),
  '/register': route({
    title: "Register new account",
    view: <Register />
  }),
  '/login': route({
    title: "Login",
    view: <Login />
  }),
});

ReactDOM.render(
  <Router routes={routes}>
    <Layout>
      <View />
    </Layout>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
