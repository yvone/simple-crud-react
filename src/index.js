import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Layout from './components/Layout';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import './index.css';

function NotFound() {
  return (
    <div>
        <h1>404 - Not Found</h1>
    </div>
  )
}


// Define the app routes
const routes = [
  {
    path: '/',
    exact: true,
    render: props => <About {...props} />
  },
  {
    path: '/dashboard',
    exact: true,
    render: props => <Dashboard {...props} />
  },
  {
    path: '/register',
    exact: true,
    render: props => <Register {...props} />
  },
  {
    path: '/login',
    exact: true,
    render: props => <Login {...props} />
  },
  {
    path: '*',
    exact: true,
    component: NotFound
  },
];

ReactDOM.render(
  <Router>
    <Layout>
      <Switch>
      {
        routes.map(route => {
          return (
            <Route
              key={route.path}
              {...route}
            />
          );
        })
      }
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
