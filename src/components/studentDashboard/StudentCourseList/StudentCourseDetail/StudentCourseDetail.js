import React, { Component } from 'react';
import { Segment, Loader, Dimmer, Card} from 'semantic-ui-react';
import StudentDaySelector from './StudentDaySelector/StudentDaySelector';
import StudentAssignmentResourceGrade from './StudentAssignmentResourceGrade/StudentAssignmentResourceGrade';
import axios from 'axios';
import './StudentCourseDetail.css'
import { Link } from "react-router-dom";
import moment from 'moment';


class StudentCourseDetail extends Component {
    constructor(){
        super();
        // let filteredCourse = this.props.courses.filter(
        //     course => course.id === +this.props.match.params.courseid
        //   )[0];
        this.state = {
            course: {},
            daysArray: [],
            resources: [],
            assignments: []
        }
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount(){
        const {courseid} = this.props.match.params;
        axios.get(`/api/student/getcoursedetail/${courseid}`).then( response => {
            this.setState({
                course:response.data.course[0],
                daysArray:response.data.daysArray,
                resources:response.data.resources,
                assignments:response.data.assignments
            })
        })
    }
    uploadFile(url, assignmentID, dateSubmitted){
        const {courseid} = this.props.match.params;
        axios.patch('/api/student/courseuploadfile', {url, assignmentID, courseid, dateSubmitted}).then( response => {
            this.setState({
                course:response.data.course[0],
                daysArray:response.data.daysArray,
                resources:response.data.resources,
                assignments:response.data.assignments
            })
        })
    }
    render(){
        const { assignments, resources, daysArray, course } = this.state;
        let daysToDisplay = daysArray.map(day => {
            return (
              <Link to={`/student/lecture/${day.id}`} key={day.id + day.topic}>
                <div className="item1">
                  <h3>{moment(day.date).format("MM/DD")}</h3>
                  <h5>{day.topic}</h5>
                </div>
              </Link>
            );
          });
        return(
            <div>
                { course
                ?
                <div>
               <h1>{course.course_name}</h1>
                    <div className='student-detail'>
                    <Card style={{ width: "600px" }}>
            <div className="container1">{daysToDisplay}</div>
          </Card> 

                 
                    <StudentAssignmentResourceGrade
                    assignments = {assignments}
                    resources = {resources}
                    course = {course}
                    uploadFileFn = {this.uploadFile}
                    />
                    </div>
                </div>
                : <Dimmer active>
                    <Loader/>
                </Dimmer>
                }
            </div>
        )
    }
}

export default StudentCourseDetail;