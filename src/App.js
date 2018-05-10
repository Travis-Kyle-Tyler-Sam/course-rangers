import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import FileUpload from './components/FileUpload';
import CurriculumBuilder from './components/CurriculumBuilder/CurriculumBuilder'

=======
import { Switch, Route, HashRouter } from "react-router-dom";
import TemporaryDashboard from './components/TemporaryDashboard';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
>>>>>>> master
class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <CurriculumBuilder />
        {/* <FileUpload/> */}
      </div>
=======



       <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/temporarydashboard' component={TemporaryDashboard} />
            {/* <Route path='/studentdashboard' component={StudentDashboard} /> */}
            <Route path='/teacherdashboard' component={TeacherDashboard} />
            {/* <Route path='/admindashboard' component={AdminDashboard} /> */}
        
          </Switch>
        </HashRouter>
       </div>
>>>>>>> master
    );
  }
}

export default App;
