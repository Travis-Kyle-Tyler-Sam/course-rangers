import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, HashRouter } from "react-router-dom";
import TemporaryDashboard from './components/TemporaryDashboard';
import Login from './components/Login';
class App extends Component {
  render() {
    return (
      <div className="App">



       <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/temporarydashboard' component={TemporaryDashboard} />
            {/* <Route path='/studentdashboard' component={StudentDashboard} /> */}
            {/* <Route path='/teacherdashboard' component={TeacherDashboard} /> */}
            {/* <Route path='/admindashboard' component={AdminDashboard} /> */}
        
          </Switch>
        </HashRouter>
       </div>
    );
  }
}

export default App;
