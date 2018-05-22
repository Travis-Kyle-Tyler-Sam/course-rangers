import React, { Component } from 'react';
import './App.css';
import { Switch, Route, HashRouter } from "react-router-dom";
import TemporaryDashboard from './components/TemporaryDashboard';
import Login from './components/Login/Login';
import StudentDashboard from './components/studentDashboard/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import CurriculumBuilder from './components/CurriculumBuilder/CurriculumBuilder';
import AdminDash from './components/AdminDash/AdminDash';
import Home from './components/home/Home';
import CourseBuilder from './components/CourseBuilder/CourseBuilder';
import LogoutScreen from './components/Logout/LogoutScreen';
import TeacherLecture from './components/TeacherLecture/TeacherLecture';
import StudentLecture from './components/StudentLecture/StudentLecture';
import StudentCourseDetail from './components/studentDashboard/StudentCourseList/StudentCourseDetail/StudentCourseDetail';
import TeacherCourseDaySelector from './components/TeacherCourseDaySelector/TeacherCourseDaySelector';
import TeacherAssignmentsView from './components/TeacherAssignmentsView/TeacherAssignmentsView';
import Profile from './components/Profile/Profile';
import NoClass from './components/NoClass/NoClass';
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
            <Route path='/curriculumbuilder/:curriculumid' component={CurriculumBuilder} />
            <Route path='/curriculumbuilder' component={CurriculumBuilder} />
            <Route path='/coursebuilder/:courseid' component={CourseBuilder}/>
            <Route path='/coursebuilder/' component={CourseBuilder}/>
            <Route path='/logoutscreen' component={LogoutScreen}/>
            <Route path='/teacher/lecture/:dayid' component={TeacherLecture}/>
            <Route path='/student/lecture' component={StudentLecture}/>
            <Route path='/student/course/:courseid' component={StudentCourseDetail}/>
            <Route path='/teacher/dayselector/:courseid' component={TeacherCourseDaySelector}/>
            <Route path='/teacher/courseassignments/:courseid/:assignmentid' component={TeacherAssignmentsView}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/teacher/noclass' component={NoClass}/>
            
          </Switch>
        </HashRouter>
       </div>
    );
  }
}

export default App;
