import React, { Component } from 'react';
import axios from 'axios';
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
        studentID:9,
       }
       this.courseRoute = this.courseRoute.bind(this);
    }
  componentDidMount(){
    const { studentID } = this.state;
    axios.get(`/api/student/getcourse/${studentID}`).then( results =>
      this.setState({
        studentsCourses:results.data.courses,
        studentsAssignments:results.data.assignments
      })
    )
  }

  courseRoute( courseid ){
    this.props.history.push(`/student/course/${courseid}`)
  }
  render() {
    const { studentsCourses, studentsAssignments, studentID } = this.state;
    return (
      <div>
        <Navbar />
        <div className='columns'>
          <StudentPendingAssign
            courses = {studentsCourses.map( course => {
              return course.course_name
            })}
            assignments = {studentsAssignments}
          
          />
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
