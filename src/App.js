import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import { Route, Switch } from 'react-router-dom';
import AdminDash from './components/AdminDash/AdminDash';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
                  <a href={process.env.REACT_APP_LOGIN}>
              <button>
                    Login
                </button>
                  </a>
                  <FileUpload/>
          <Switch>
            <Route path='/admindash' component={AdminDash}/>
          </Switch>
      </div>
    );
  }
}

export default App;
