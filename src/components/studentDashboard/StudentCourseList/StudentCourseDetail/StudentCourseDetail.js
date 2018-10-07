import React, { Component } from 'react';
import { Loader, Dimmer, Card} from 'semantic-ui-react';
import StudentAssignmentResourceGrade from './StudentAssignmentResourceGrade/StudentAssignmentResourceGrade';
import axios from 'axios';
import './StudentCourseDetail.css'
import { Link } from "react-router-dom";
import moment from 'moment';


class StudentCourseDetail extends Component {
    constructor(){
        super();
        this.state = {
            course: {},
            daysArray: [],
            resources: [],
            assignments: [],
            loading: true
        }
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentDidMount(){
        const {courseid} = this.props.match.params;
        if (!courseid){
            this.setState({
                course:{
                    course_name:'No courses yet!',
                    teacher_name:'Check with an admin',
                    letterGrade:'No grades yet!',
                    percent:'No grades yet!'
                },
                daysArray:[
                    {
                        date:'No school days yet!'
                    }
                ],
                assignments:[{
                    name:'No assignments yet!'
                }],
                resources:[{
                    name:'No resources yet!'
                }]
            })
        }
        else {
            axios.get(`/api/student/getcoursedetail/${courseid}`).then( response => {
                this.setState({
                    course:response.data.course[0],
                    daysArray:response.data.daysArray,
                    resources:response.data.resources,
                    assignments:response.data.assignments,
                    loading: false
                })
            })
        }
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
        const { assignments, resources, daysArray, course, loading } = this.state;
        if(loading) {
            return (
            <Dimmer active>
                <Loader>Loading</Loader>
            </Dimmer>
        
            )
        }
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
                <div className='student-course-detail'>
                    <Card 
                    id='course-day-selector'
                    className='day-selector'>
                        <h1 className='course-name'>{course.course_name}</h1>
                        <div className="container1">{daysToDisplay}</div>
                    </Card> 
                    <StudentAssignmentResourceGrade
                        assignments = {assignments}
                        resources = {resources}
                        course = {course}
                        uploadFileFn = {this.uploadFile}
                    />
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