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
       this.uploadFile = this.uploadFile.bind(this);
    }
  componentDidMount(){
    axios.get(`/auth/me`).then( results => {
      this.setState({
        studentID:results.data.id
      })
    })
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    const { studentID } = this.state;
    if (prevState.studentID !== studentID){
      axios.get(`/api/student/getcourse/${studentID}`).then( results =>
        this.setState({
          studentsCourses:results.data.courses,
          studentsAssignments:results.data.assignments
        })
      )
    }
  }
  uploadFile( url, assignmentID, dateSubmitted ){
    const { studentID } = this.state;
    axios.patch('/api/student/uploadfile', { url, assignmentID, studentID, dateSubmitted }).then( results => {
      this.setState({
        studentsCourses:results.data.courses,
        studentsAssignments:results.data.assignments
      })
    })
  }
  calculatePercent( arrOfAssignments ){
    let pointsPossible = arrOfAssignments.reduce( (accumulator, value) => {
      return accumulator += +value.points_possible ? +value.points_possible : 0
    },0)
    let pointsEarned = arrOfAssignments.reduce( (accumulator, value) => {
      return accumulator += +value.point_scored ? +value.point_scored : 0
    },0)
    if (pointsPossible !== 0){
      let percent = Math.floor((pointsEarned / pointsPossible)*100)
      if (percent >=90){
        return {percent, letter:'A'}
      } else if (percent >= 80){
        return {percent, letter:'B'}
      } else if (percent>= 70){
        return {percent, letter:'C'}
      } else if (percent>= 60){
        return {percent, letter:'D'}
      } else return {percent, letter:'F'}
      
    }
    else return 'No Grades Yet'
  }

  courseRoute( courseid ){
    this.props.history.push(`/student/course/${courseid}`)
  }
  render() {
    const { studentsCourses, studentsAssignments, studentID } = this.state;
    return (
      <div className='dashboard'>
        <div className='columns'>
          <StudentPendingAssign
            courses = {studentsCourses.map( course => {
              return course.course_name
            })}
            assignments = {studentsAssignments}
            uploadFileFn = {this.uploadFile}
          />
          <StudentCourseList 
            id = {studentID}
            studentsCourses = {studentsCourses}
            courseRouteFn = {this.courseRoute}
            assignments = {studentsAssignments}
            calculatePercentFn = {this.calculatePercent}
          />
        </div>
      </div>
    )
  }
}
export default StudentDashboard
