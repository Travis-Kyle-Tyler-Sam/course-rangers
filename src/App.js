import React, { Component } from 'react';
import './App.css';
import { Switch, Route, HashRouter } from "react-router-dom";
import TemporaryDashboard from './components/TemporaryDashboard';
import Login from './components/Login';
import StudentDashboard from './components/studentDashboard/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import CurriculumBuilder from './components/CurriculumBuilder/CurriculumBuilder';
import AdminDash from './components/AdminDash/AdminDash';
import Home from './components/home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">



       <HashRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/temporarydashboard' component={TemporaryDashboard} />
            <Route path='/studentdashboard' component={StudentDashboard} />
            <Route path='/teacherdashboard' component={TeacherDashboard} />
            <Route path='/admindashboard' component={AdminDash} />
            <Route path='/curriculumbuilder' component={CurriculumBuilder} />
        
          </Switch>
        </HashRouter>
       </div>
    );
  }
}

export default App;
