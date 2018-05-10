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
