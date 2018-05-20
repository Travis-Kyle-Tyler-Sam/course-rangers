import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar';
import StudentPendingAssign from './studentPendingAssign/StudentPendingAssign';
import StudentCourseList from './StudentCourseList/StudentCourseList'
import StudentAssignmentDetail from './StudentAssignmentDetail/StudentAssignmentDetail';
import './StudentDashboard.css'
class StudentDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        studentsCourses: [{
          courseName:'Math',
          teacherName:'Mrs. Henry',
          percent:92,
          letterGrade:'A-',
          id:5
        }],
        studentsAssignments: [],
        studentID:0,
       }
       this.courseRoute = this.courseRoute.bind(this);
    }
  componentDidMount(){

  }

  courseRoute( courseid ){
    this.props.history.push(`/student/course`)
  }
  render() {
    const { studentsCourses, studentsAssignments, studentID } = this.state;
    return (
      <div>
        <Navbar />
        <div className='columns'>
          <StudentPendingAssign/>
          <StudentCourseList 
          id = {studentID}
          studentsCourses = {studentsCourses}
          courseRouteFn = {this.courseRoute}
          />
        </div>
      </div>
    )
  }
}
export default StudentDashboard
